export function inputError(event, element, minLength) {
	if (event.target.value.length >= minLength) {
		element.classList.remove('input--error');
		element.classList.add('input--complete');
	} else {
		element.classList.remove('input--complete');
		element.classList.add('input--error');
	}
}