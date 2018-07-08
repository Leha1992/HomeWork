window.onload = () => {

	image.addEventListener('click', () => {
		let img = document.createElement('img');
		img.src="https://i.ytimg.com/vi/7gh-Gs2o_MI/movieposter.jpg";
		document.body.appendChild(img);
	})

	obj.addEventListener('click', () => {

		let human = {
			firstName: 'Ivan',
			lastName:  'Ivanov',
			fullName: 'Ivan Ivanov',
			age: '99',
			weight: '150'

		};

		objContainer.innerHTML = JSON.stringify(human);

		console.log(human);
	});

};
