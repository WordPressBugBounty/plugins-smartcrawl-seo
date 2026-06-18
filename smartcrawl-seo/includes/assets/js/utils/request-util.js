import ajaxUrl from 'ajaxUrl';

/**
 * Build application/x-www-form-urlencoded body for WordPress admin-ajax.php.
 *
 * @param {string} action AJAX action name.
 * @param {string} nonce  Nonce value (_wds_nonce).
 * @param {Object} data   Extra scalar fields.
 * @returns {URLSearchParams}
 */
function buildAjaxBody(action, nonce, data) {
	const params = new URLSearchParams();
	params.append('action', action);
	params.append('_wds_nonce', nonce);
	Object.keys(data || {}).forEach((key) =>
		appendParam(params, key, data[key])
	);
	return params;
}

/**
 * Recursively append request data using PHP-style keys.
 *
 * @param {URLSearchParams} params Params collection.
 * @param {string} key             Request key.
 * @param {*} value                Request value.
 */
function appendParam(params, key, value) {
	if (value === undefined || value === null) {
		return;
	}

	if (Array.isArray(value)) {
		const shouldIndex = value.some(
			(item) => item !== null && typeof item === 'object'
		);

		if (shouldIndex) {
			value.forEach((item, index) =>
				appendParam(params, `${key}[${index}]`, item)
			);
		} else {
			value.forEach((item) => appendParam(params, `${key}[]`, item));
		}
		return;
	}

	if (typeof value === 'object') {
		Object.keys(value).forEach((nestedKey) =>
			appendParam(params, `${key}[${nestedKey}]`, value[nestedKey])
		);
		return;
	}

	params.append(key, value);
}

/**
 * SmartCrawl admin-ajax transport (fetch — no jQuery).
 */
export default class RequestUtil {
	static post(action, nonce, data = {}) {
		return fetch(ajaxUrl, {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type':
					'application/x-www-form-urlencoded; charset=UTF-8',
			},
			body: buildAjaxBody(action, nonce, data),
		})
			.then((response) => response.json())
			.then((responseJson) => {
				if (responseJson.success) {
					return responseJson.data;
				}
				return Promise.reject(responseJson?.data?.message);
			});
	}

	static uploadFile(action, nonce, file) {
		const formData = new FormData();
		formData.append('file', file);
		formData.append('action', action);
		formData.append('_wds_nonce', nonce);

		return fetch(ajaxUrl, {
			method: 'POST',
			credentials: 'same-origin',
			body: formData,
		})
			.then((response) => response.json())
			.then((responseJson) => {
				if (responseJson.success) {
					return responseJson.data;
				}
				return Promise.reject(responseJson?.data?.message);
			});
	}
}
