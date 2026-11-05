# Текстовый ввод

Используйте эту страницу, когда пользователь вводит текст и главное решение — останется ли поле универсальным, станет многострочным или получит специализированный контракт ввода.

## Быстрые правила выбора

- Используйте [TextField](../components/text-field/) для универсального однострочного текста.
- Используйте [TextArea](../components/text-area/) для многострочного текста.
- Используйте [PasswordField](../components/password-field/) для ввода секретов со скрытием символов.
- Используйте [NumberField](../components/number-field/) для точных числовых значений с шагом или границами.
- Используйте [PhoneField](../components/phone-field/) для ввода телефона с учётом страны.
- Используйте [PinField](../components/pin-field/) для коротких кодов подтверждения фиксированной длины.

## По модели значения

- Универсальный однострочный текст: [TextField](../components/text-field/)
- Многострочный текст: [TextArea](../components/text-area/)
- Секретная строка: [PasswordField](../components/password-field/)
- Числовая величина: [NumberField](../components/number-field/)
- Номер телефона: [PhoneField](../components/phone-field/)
- OTP- или PIN-код: [PinField](../components/pin-field/)

## Частые ошибки классификации

- Не используйте [TextField](../components/text-field/), когда маска, разбор телефона, шаг числа или показ секрета становятся частью контракта поля.
- Не используйте [TextArea](../components/text-area/) для коротких однострочных значений.
- Не используйте [NumberField](../components/number-field/) для идентификаторов или кодов, которые просто состоят из цифр.
- Не используйте [PinField](../components/pin-field/) для секретов в свободной форме или обычного текста.

## Вспомогательные элементы

- Используйте [Label](../components/label/) для подписи одного поля.
- Используйте [HelperText](../components/helper-text/) для короткой подсказки рядом с полем.
- Используйте [Fieldset](../components/fieldset/), когда несколько полей относятся к одной именованной группе.
