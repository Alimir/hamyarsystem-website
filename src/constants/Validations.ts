import {Validation, ValidationLang} from 'bunnyjs/src/Validation';

Validation.lang = {
    ...ValidationLang,
    required: "وارد کردن '{label}' الزامی است.",
    email: "'{label}' باید یک آدرس ایمیل معتبر باشد.",
    tel: "'{label}' باید یک تلفن همراه معتبر باشد.",
    maxLength: "'{label}' حداکثر می‌تواند شامل '{maxLength}' کاراکتر باشد",
    minLength: "'{label}' حداقل باید شامل '{minLength}' کاراکتر باشد",
};

Validation.validators.tel = input => {
    return new Promise((valid, invalid) => {
        if (input.value.length > 0 && input.getAttribute('type') === 'tel') {
            const Regex = /([0][9][0-9]{9})$/;
            if (Regex.test(input.value))
                valid();
            else
                invalid();
        }
        else
            valid();
    });
};

Validation.initWithCallback = (form, callback) => {
    form.setAttribute('novalidate', '');
    form.addEventListener('submit', e => {
        e.preventDefault();
        const submitBtns = form.querySelectorAll('[type="submit"]');
        [].forEach.call(submitBtns, submitBtn => {
            submitBtn.disabled = true;
        });
        Validation.validateSection(form).then(result => {
            [].forEach.call(submitBtns, submitBtn => {
                submitBtn.disabled = false;
            });
            if (result === true)
                callback(e);
            else
                Validation.focusInput(result[0]);
        })
    });
};

export const Validations = Validation;