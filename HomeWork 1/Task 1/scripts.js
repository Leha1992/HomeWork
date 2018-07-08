window.onload = () => {

const name =prompt('Ваше имя?'),
      hasNumber = /\d/;


const checkContainNumber = name => {

	let arr = [];

	if(hasNumber.test(name)) {

		let UpperCaseName = name.split('');

		for (let i = 0; i <UpperCaseName.length; i++) {

			if(i % 2 !== 0) {
				arr.push(UpperCaseName[i].toUpperCase())
			} else {
				arr.push(UpperCaseName[i].toLowerCase())
			}
		}
		
		alert(arr.join(''));

	} else {
		 let reverseName = name.split('').reverse().join('');
		 alert(reverseName);
	}

}

checkContainNumber(name);
};
