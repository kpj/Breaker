function getMaxSubListLength(list) {
	var maxi = 0;

	for(var p in list) {
		if(list[p].length > maxi)
			maxi = list[p].length;
	}

	return maxi;
}

function randomElement(list) {
	return list[Math.floor(Math.random() * list.length)];
}