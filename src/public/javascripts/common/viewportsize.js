$(document).ready(function() {

    // -----------
    // quickndirty debug function - shows device and viewport size
    // -----------

    var breakpoints = {
            xl: 1280,
            l: 1024,
            m: 768,
            s: 568
        },
        height,
        width,
        device, styles;
        

    function getDimensions() {
        height = $(window).height();
        width = $(window).width();

        if (width < (breakpoints.s - 1))
            device = 'Small Phone';
        if (width > breakpoints.s && width < (breakpoints.m - 1))
            device = 'Big Phone';
        if (width > breakpoints.m && width < (breakpoints.l - 1))
            device = 'Tablet';
        if (width > breakpoints.l && width < (breakpoints.xl - 1))
            device = 'Laptop';
        if (width > breakpoints.xl)
            device = 'Desktop';
        
        styles = '<div id="viewportsize" ' +
                 'style="z-index:9999; position:fixed; top: 8px; left: 50%; transform: translateX(-50%); ' +
                 'color: #fff; background: rgba(0, 0, 0, 0.7); padding: 6px 8px; border-radius: 3px;font-size: 16px">H: ' + height +
                 '&nbsp;/&nbsp; W: ' + width + ' &nbsp;/&nbsp; ' + device + '</div>';
    }

    // default size
    getDimensions();
    $('body').prepend(styles);
    

    // update on change
    $(window).resize(function() {
        height = $(window).height();
        width = $(window).width();
        getDimensions();

        $('#viewportsize').html('H: ' + height + 'px &nbsp;/&nbsp; W: ' + width + ' &nbsp;/&nbsp; ' + device);

    });



});
