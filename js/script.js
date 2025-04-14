$(document).ready(function() {
    // Add new color field
    $('#add-color-field').on('click', function() {
        const newField = $(`
            <div class="color-field">
                <input type="text" class="hex-input" placeholder="#000000" pattern="^#?([A-Fa-f0-9]{6})$" required>
                <div class="color-preview"></div>
            </div>
        `);
        $('.color-fields').append(newField);
        
        // Add color preview handler to new field
        addColorPreviewHandler(newField.find('.hex-input'));
    });

    // Handle color preview
    function addColorPreviewHandler(input) {
        const preview = input.next('.color-preview');
        
        input.on('input', function() {
            let color = $(this).val();
            if (color.match(/^#?([A-Fa-f0-9]{6})$/)) {
                if (!color.startsWith('#')) {
                    color = '#' + color;
                }
                preview.css('background-color', color);
            }
        });
    }

    // Add color preview handlers to initial fields
    $('.hex-input').each(function() {
        addColorPreviewHandler($(this));
    });

    // Calculate relative luminance
    function getLuminance(r, g, b) {
        let [rs, gs, bs] = [r / 255, g / 255, b / 255].map(function(c) {
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    }

    // Calculate contrast ratio
    function getContrastRatio(l1, l2) {
        let lighter = Math.max(l1, l2);
        let darker = Math.min(l1, l2);
        return (lighter + 0.05) / (darker + 0.05);
    }

    // Convert hex to RGB
    function hexToRgb(hex) {
        hex = hex.replace('#', '');
        return {
            r: parseInt(hex.substring(0, 2), 16),
            g: parseInt(hex.substring(2, 4), 16),
            b: parseInt(hex.substring(4, 6), 16)
        };
    }

    // Get contrast indicator
    function getContrastIndicator(ratio, isSame) {
        if (isSame) {
            return '<span class="contrast-cell-same"><span class="sr-only">Same color</span></span>';
        }
        const ratioText = ratio.toFixed(2);
        if (ratio >= 4.5) {
            return `<span class="contrast-pass">✓<span class="sr-only">Pass</span></span> ${ratioText}`;
        }
        if (ratio >= 3.0) {
            return `<span class="contrast-warn">▲<span class="sr-only">Warning</span></span> ${ratioText}`;
        }
        return `<span class="contrast-fail">×<span class="sr-only">Fail</span></span> ${ratioText}`;
    }

    // Generate the results table
    $('#color-contrast-form').on('submit', function(e) {
        e.preventDefault();
        
        // Get all color values
        const colors = [];
        $('.hex-input').each(function() {
            let color = $(this).val();
            if (!color.startsWith('#')) {
                color = '#' + color;
            }
            colors.push(color);
        });

        // Create table header
        let tableHtml = '<table class="contrast-table"><tr><th></th>';
        colors.forEach(color => {
            tableHtml += `<th style="background-color: ${color}">${color}</th>`;
        });
        tableHtml += '</tr>';

        // Create table rows
        colors.forEach((rowColor, i) => {
            tableHtml += `<tr><th style="background-color: ${rowColor}">${rowColor}</th>`;
            
            colors.forEach((colColor, j) => {
                const rgb1 = hexToRgb(rowColor);
                const rgb2 = hexToRgb(colColor);
                
                const l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
                const l2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
                
                const ratio = getContrastRatio(l1, l2);
                const isSame = i === j;
                
                tableHtml += `<td>${getContrastIndicator(ratio, isSame)}</td>`;
            });
            
            tableHtml += '</tr>';
        });
        
        tableHtml += '</table>';
        
        // Display the table
        $('#results-table').html(tableHtml);
    });
}); 