let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let category = document.getElementById('category');
let total = document.getElementById("total");
let submit = document.getElementById("submit");
let count = document.getElementById('count');

let programStatus = 'create';
let temp;

// get Total function
function getTotal()
{
	if (price.value != '')
	{
		let result = (Number(price.value) + Number(taxes.value) + Number(ads.value))
		 - Number(discount.value);
		 total.innerHTML = result;
		 total.style.background = '#40916c';
	}
	else
	{
		total.innerHTML = '';
		total.style.background = "#650000";
	}
}

// create product function
let dataPro;
if (localStorage.product != null)
{
	dataPro = JSON.parse(localStorage.product);
}
else
{
	dataPro = [];
}

submit.onclick = function()
{
	let newPro = 
	{
		title: title.value,
		price: price.value,
		ads: ads.value,
		taxes: taxes.value,
		discount: discount.value,
		total: total.innerHTML,
		count: count.value,
		category: category.value,
	}

	// count and create Products
	if (title.value != ''
		&& price.value != ''
		&& category.value != ''
		&& count.value <= 1000)
	{
		if (programStatus === 'create')
		{
			if (newPro.count > 1)
			{
				let i = 0;
				while (i < newPro.count)
				{
					dataPro.push(newPro);
					i++;
				}
			}
			else
			{
				dataPro.push(newPro);
			}
		}
		else
		{
			dataPro[temp] = newPro;
			programStatus = 'create';
			submit.innerHTML = 'Create';
			count.style.display = 'block';
		}
		clearData();
	}
	// save localStorage
	localStorage.setItem('product', JSON.stringify(dataPro));
	showData();
}

// clear inputs function
function clearData()
{
	title.value = '';
	price.value = '';
	taxes.value = '';
	ads.value = '';
	discount.value = '';
	total.innerHTML = '';
	count.value = '';
	category.value = '';
}

// read function
function showData()
{
	let table = '';
	let i = 0;
	while (i < dataPro.length)
	{
		table += `
		<tr>
			<td>${i + 1}</td>
			<td>${dataPro[i].title}</td>
			<td>${dataPro[i].price}</td>
			<td>${dataPro[i].taxes}</td>
			<td>${dataPro[i].ads}</td>
			<td>${dataPro[i].discount}</td>
			<td>${dataPro[i].total}</td>
			<td>${dataPro[i].category}</td>
			<td><button onclick="updateData(${i})" id="update">Update</button></td>
			<td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
		</tr>
		`;
		i++;
	}
	let deleteAllBtn = document.getElementById("deleteAll");
	if (dataPro.length > 0)
	{
		deleteAllBtn.innerHTML = `
			<button onclick="deleteAll()">Delete All (${dataPro.length})</button>
		`
	}
	else
	{
		deleteAllBtn.innerHTML = '';
	}

	document.getElementById('tbody').innerHTML = table;
	getTotal();
}

// delete function
function deleteData(i)
{
	dataPro.splice(i,1);
	localStorage.product = JSON.stringify(dataPro);
	showData();
}

// deleteAll function
function deleteAll()
{
	localStorage.clear();
	dataPro.splice(0);
	showData();
}

// Update function
function updateData(i)
{
	title.value = dataPro[i].title;
	price.value = dataPro[i].price;
	taxes.value = dataPro[i].taxes;
	ads.value = dataPro[i].ads;
	discount.value = dataPro[i].discount;
	getTotal();
	count.style.display = 'none';
	category.value = dataPro[i].category;
	submit.innerHTML = 'Update';
	programStatus = 'update';
	temp = i;
	scroll({
		top:0,
		behavior:"smooth",
	});
}

// searchStatus function
let searchStatus = 'byTitle';
function getSearchStatus(id)
{
	let search = document.getElementById("search");
	if (id === 'searchByTitle')
	{
		searchStatus = 'byTitle';
		search.placeholder = 'Search By Title';
	}
	else
	{
		searchStatus = 'byCategory';
		search.placeholder = "Search By Category";
	}
	search.focus();
	search.value = '';
	showData();
}

// searchData function
function searchData(value)
{
	let table = '';
	for (let i = 0; i < dataPro.length; i++)
	{
        if (searchStatus == "byTitle")
		{
        	if (dataPro[i].title.toLowerCase().includes(value.toLowerCase()))
			{
            	table += `
					<tr>
						<td>${i}</td>
						<td>${dataPro[i].title}</td>
						<td>${dataPro[i].price}</td>
						<td>${dataPro[i].taxes}</td>
						<td>${dataPro[i].ads}</td>
						<td>${dataPro[i].discount}</td>
						<td>${dataPro[i].total}</td>
						<td>${dataPro[i].category}</td>
						<td><button onclick="updateData(${i})" id="update">Update</button></td>
						<td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
					</tr>
					`;
        	}
        }
		else
		{
        	if (dataPro[i].category.toLowerCase().includes(value.toLowerCase()))
			{
				table += `
					<tr>
						<td>${i}</td>
						<td>${dataPro[i].title}</td>
						<td>${dataPro[i].price}</td>
						<td>${dataPro[i].taxes}</td>
						<td>${dataPro[i].ads}</td>
						<td>${dataPro[i].discount}</td>
						<td>${dataPro[i].total}</td>
						<td>${dataPro[i].category}</td>
						<td><button onclick="updateData(${i})" id="update">Update</button></td>
						<td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
					</tr>
					`;
        	}
        }
	}	
	document.getElementById("tbody").innerHTML = table;
}

showData();