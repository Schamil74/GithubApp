const messages = (string: string): string => {
    switch (string) {
        case 'Network Error':
            return 'Ошибка сети, проверьте наличие интернета'

        case 'Request failed with status code 403':
            return 'Кол-во запросов ограничено в промежутке времени. Перезагрузите страницу'

        default:
            return 'Неизвестная ошибка. Обратитесь к администратору'
    }
}

export default messages
