

var initForm = function() {

    // ---------------------------------- ----------------------------------
    // VARIABLES
    // ---------------------------------- ----------------------------------

    var $mail = $('#email'),
        $content = $('#content'),
        $submit = $('#send-email'),
        $infoStatus = $('#info-status'),
        $errMail = $('#err-mail'),
        $errContent = $('#err-content'),
        $errCaptcha = $('#err-captcha'),
        $reloadCaptcha = $('#reload-captcha'),
        $resetForm = $('#reset-form'),
        $captcha = $('#captcha'),
        $captchaImg = $('#captcha-image'),
        captchaText,
        typing = 'keyup keypress change',
        leaving = 'focusout'; //'blur',
        loadingCaptcha = false;


    // ---------------------------------- ----------------------------------
    // FORM ANIMATIONS
    // ---------------------------------- ----------------------------------

    var activeFormAnimation = function() {

        $('.pxc-input').focusin(function() {
            $(this).next().removeClass('before').addClass('after');
        });

        $('.pxc-input').focusout(function() {
            if (!$(this).val())
                $(this).next().removeClass('after').addClass('before');
        });

    };

    // ---------------------------------- ----------------------------------
    // FORM VALIDATION
    // ---------------------------------- ----------------------------------


    var formValid = function() {



        var value = '',
            valid = {
                email: false,
                nachricht: false,
                captcha: false
            },
            errorArr = [
                'Mit der Adresse stimmt was nicht',
                'Das stimmt noch nicht ganz',
                'Erzähl mir doch etwas mehr',
                'Ist bestimmt spannend, noch mehr!',
                'Das Captcha ist nicht korrekt',
                'Irgendetwas stimmt noch nicht',

                'Jetzt passt es!'
            ],
            sentSuccess= "Ihre Nachricht wurde an <span>application@pixel.cooking</span> gesendet. Vielen Dank für Ihr Interesse an mir!",
            sentFail= "Sorry, da lief was schief. Du kannst mir aber auch selbst eine Email an <span><a href='mailto:application@pixel.cooking'>application@pixel.cooking</a></span> senden",
            firstMailInput = true,
            firstContentInput = true,
            firstCaptchaInput = true,
            triedToSubmit = false;


        var showInfoText = function() {
            $infoStatus.fadeTo(250, 1);
            $infoStatus.text(findMissingInput(valid));
        };


        var errorHandler = function(validInput, $errorMessage, pos) {

            if (!validInput) {
                $errorMessage.fadeTo(250, 1);
                $errorMessage.text(errorArr[pos]);
            } else {
                $errorMessage.fadeTo(150, 0);
                $errorMessage.text(errorArr[errorArr.length - 1]);
            }
        };





        // email validation handler
        $mail.on(leaving, function() {

            var email = $mail.val().trim(),
                validEmail = validateEmail(email);

            if (!validEmail) valid.email = false;
            else valid.email = true;

            errorHandler(valid.email, $errMail, 0);
            firstMailInput = false;
            if (triedToSubmit) showInfoText();
        });

        $mail.on(typing, function() {
            if (!firstMailInput) {
                var email = $mail.val().trim(),
                    validEmail = validateEmail(email);

                if (!validEmail) valid.email = false;
                else valid.email = true;

                if (triedToSubmit) showInfoText();
                errorHandler(valid.email, $errMail, 1);
            }


        });

        //email validation with regexp
        function validateEmail(email) {

            var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return pattern.test(email);
        }






        // content validation handler
        $content.on(leaving, function() {

            if ($content.val().length < 5) {
                valid.nachricht = false;
                errorHandler(valid.nachricht, $errContent, 2);
            } else if ($content.val().length < 15) {
                valid.nachricht = false;
                errorHandler(valid.nachricht, $errContent, 3);
            } else valid.nachricht = true;

            if (triedToSubmit) showInfoText();
            firstContentInput = false;
        });

        $content.on(typing, function() {
            if (!firstContentInput) {
                if ($content.val().length < 15)
                    valid.nachricht = false;
                else {
                    valid.nachricht = true;

                }

                if (triedToSubmit) showInfoText();
                errorHandler(valid.nachricht, $errContent, 3);
            }
        });




        // captcha validation handler


        //load captcha with ajax request
        var loadCaptcha = function() {
            $.get("//localhost/captcha", {}, function(captchaObj) {
                captchaText = captchaObj.text;
                $captchaImg.append(captchaObj.data);
                loadingCaptcha = false;
            });
        };
        loadCaptcha();


        // validation for captcha
        $captcha.on(leaving, function() {

            if ($(this).val() != captchaText) valid.captcha = false;
            else valid.captcha = true;

            errorHandler(valid.captcha, $errCaptcha, 4);
            firstCaptchaInput = false;
            if (triedToSubmit) showInfoText();
        });

        $captcha.on(typing, function() {
            if (!firstCaptchaInput) {
                if ($(this).val() != captchaText) valid.captcha = false;
                else valid.captcha = true;

                if (triedToSubmit) showInfoText();
                
                errorHandler(valid.captcha, $errCaptcha, 5);
            }

        });

        var reloadCaptcha = function() {
            
            $captcha.val('');
            firstCaptchaInput = true;
            $captcha.focusout();
            $errCaptcha.fadeTo(250, 0);
            $errCaptcha.delay(1250).text('');

            loadCaptcha();
            $captchaImg.children().remove();
        };

        $reloadCaptcha.on('click', function() {
            // loadingCaptcha Boolean prevents from loading
            //  captcha twice when button is clicked twice
            if(!loadingCaptcha){
                reloadCaptcha();
                loadingCaptcha = true;
            }
        });







        //if reset form, reset errors
        // $resetForm.click(function() {
        //     resetForm();
        // });

        function resetForm() {
            // reset valid bools
            for (var key in valid) {
                key = false;
            }

            // reset input fields
            $mail.val('');
            $mail.focusout();
            firstMailInput = true;
            $content.val('');
            $content.focusout();
            firstContentInput = true;
            reloadCaptcha();
            triedToSubmit = false;

            // reset input styles
            $('input').focusout();
            // reset error messages
            for (var i = 0; i < errorArr.length; i++) {
                $('[id^=err-], #info-status').fadeTo(250, 0);
                $('[id^=err-], #info-status').delay(250).text('');
            }
        }



        // ---------------------------------- ----------------------------------
        // Submit Form
        // ---------------------------------- ----------------------------------

        // confirm sent toast
        

        var showToast = function(text, duration){
            $toast = $("#toast");
            
            $toast.html(text);

            if($toast.hasClass('fade-toast-out'))
                $toast.removeClass('fade-toast-out');
            if($toast.hasClass('hidden'))
                $toast.removeClass('hidden');
            
            $toast.addClass('fade-toast-in');
           
            setTimeout(function(){
                $toast.addClass('fade-toast-out');
                setTimeout(function(){
                    if($toast.hasClass('fade-toast-in'))
                        $toast.removeClass('fade-toast-in');
                    $toast.addClass('hidden');
                }, 400);
            },duration);

        };



        var showFail = function(){
                $('.sent-mail-layer').fadeOut('fast');
                $('.input-wrapper').fadeTo(400, 1);
                $('.pxc-btn-wrapper').fadeTo(400, 1);
                showToast(sentFail, 7000);
        };


        var submitForm = function(obj) {

            $.get("//localhost/send", obj, function(data) {

                if (data == "sent") {
                    $('.sent-mail-layer').fadeOut('fast');
                    $('.input-wrapper').fadeTo(400, 1);
                    $('.pxc-btn-wrapper').fadeTo(400, 1);
                    showToast(sentSuccess, 4500);
                }
                else
                    showFail();

            }).error(function() {
                showFail();
            });
        };




        var findMissingInput = function(validArr) {

            var missingInput = 0,
                infoStatus = 'Fehlerhafte Eingabe bei ',
                defaultText = infoStatus;

            for (var key in validArr) {

                if (validArr.hasOwnProperty(key)) {

                    if (!validArr[key]) {
                        missingInput++;
                        infoStatus += key.capitalize() + ', ';
                    }
                }
            }

            if (!!infoStatus) {
                var status = formatStatusString(infoStatus);                
                if(defaultText.length-1 != status.length)
                    return status;
                // resets if all incorrect input was corrected
                else
                    return '';
            } else
                return '';

        };



        var formatStatusString = function(status) {
            
            status = status.trim();
            
            if (status.endsWith(","))
                status = status.replace(/.$/, ".");

            status = status.replace(/,(?=[^,]+$)/, ' und');

            return status;
        };


        // function to capitalize the first letter
        // use it like: myStringTo.capitalize();
        String.prototype.capitalize = function() {
            return this.charAt(0).toUpperCase() + this.slice(1);
        };



        $submit.click(function(event) {
            // if form is valid

            if (valid.email && valid.nachricht && valid.captcha) {
                // wrap all inputs in an array

                var formObj = {
                    mail: $mail.val().trim(),
                    content: $content.val().trim()
                };

                // hand it over
                console.log(formObj);
                submitForm(formObj);
                resetForm();
                
                // fade in loading layer 
                $('.input-wrapper').fadeTo(200, 0);
                $('.pxc-btn-wrapper').fadeTo(200, 0);
                $('.sent-mail-layer').fadeIn('slow');
            

            } else {
                event.preventDefault();
                triedToSubmit = true;
                $infoStatus.fadeTo(250, 1);
                $infoStatus.text(findMissingInput(valid));
            }
        });





    };

    return {
        activateFormValidation: formValid,
        activateAnimations: activeFormAnimation
    };

};


$(function() {

    initForm().activateFormValidation();
    initForm().activateAnimations();

});
