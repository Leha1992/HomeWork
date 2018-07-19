function Computer (provider,type,typeCPU,typeGPU,typeRAM,hardDriveMemory) {
    this.provider = provider;
    this.type = type;
    this.typeCPU = typeCPU;
    this.typeGPU = typeGPU;
    this.typeRAM = typeRAM;
    this.hardDriveMemory = hardDriveMemory;
    this.dateCreated = new Date();
    this.typeItem = 'computer';
} 

function Ultrabook (provider,type,typeCPU,typeGPU,typeRAM,hardDriveMemory,hyperThreading,numCores) {
    Computer.apply(this, arguments);
    this.hyperThreading = false;
    this.numCores = numCores;
    this.typeItem = 'ultrabook';
}

Ultrabook.prototype = Object.create(Computer);
Ultrabook.prototype.constructor = Ultrabook;

function ComputerServer (provider,type,typeCPU,typeGPU,typeRAM,hardDriveMemory,hyperThreading,numCores,modelGPU,amountOfRAM) {
    Ultrabook.apply(this, arguments)
    this.modelGPU = modelGPU;
    this.amountOfRAM = amountOfRAM;
    this.typeItem = 'computerServer';
};

ComputerServer.prototype = Object.create(Ultrabook);
ComputerServer.prototype.constructor = ComputerServer;

function DBservase (apiUrl) {
   this.apiUrl = apiUrl; 
};

DBservase.prototype.saveItemInDb = function (item) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST',this.apiUrl,true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(item);       
};

DBservase.prototype.getItmesFromDb = function (callback,delteItem,getItem,edit) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', this.apiUrl,true);
    xhr.send('');

    xhr.onload = function (res) {
        callback(JSON.parse(res.currentTarget.responseText));
        delteItem();
        getItem();
        edit();
    };
};

DBservase.prototype.getItem = function (addInfo,editInfo) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET',`${this.apiUrl}/${localStorage.getItem('id')}`,true);
    xhr.send('');

    xhr.onload = function (res) {
        location.href.slice(-9) === "info.html" ? addInfo(JSON.parse(res.currentTarget.responseText)) : editInfo(JSON.parse(res.currentTarget.responseText));
    };   
};

DBservase.prototype.deleteItem = function (e) {
    var confirmation = confirm('Вы точно хотитет удалить отбъект?');
    if(confirmation) {
        var xhr = new XMLHttpRequest();
        xhr.open('DELETE',`${this.apiUrl}/${e.target.parentNode.parentNode.id}`,true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send('');
        e.target.parentNode.parentNode.remove();
        return;
    }; 

    return;
};

DBservase.prototype.updateItem = function (item) {
    var xhr = new XMLHttpRequest();
    xhr.open('PUT',`${this.apiUrl}/${localStorage.getItem('id')}`,true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(item);
}

var dbServase = new DBservase('http://localhost:2403/items');

function renderItems (text) {
    console.log(text);
    var tableComputer = document.getElementById('computer-table');
    for (var i = 0; i < text.length; i++) {
         var tr = document.createElement('tr');
        tr.innerHTML = `<td>${text[i].provider}</td>
            <td>${text[i].type}</td>
            <td>${text[i].typeCPU}</td>
            <td>${text[i].typeGPU}</td>
            <td>${text[i].typeRAM}</td>
            <td>${text[i].hardDriveMemory}</td>
            <td>
                <span class="btn-edit">редактировать</span>
                <span class="btn-delete">удалить<span>
            </td>
            <td><a class="btn-info">Подробнее</a></td>`
      tr.id = text[i].id;     
      tableComputer.appendChild(tr);      
    }
}

function getId (e) {
    var id = e.target.parentNode.parentNode.id;
    localStorage.setItem("id",id); 
    e.target.className === 'btn-info' ? location.href = 'info.html': location.href = 'edit.html';
}

function editItem (text) {
     switch (text.typeItem) {
        case 'computer':
            document.getElementById('computer-create').style.display = 'block';

            document.getElementById('produser').value = text.provider;
            document.getElementById('type').value = text.type;
            document.getElementById('type-cpu').value = text.typeCPU;
            document.getElementById('type-gpu').value = text.typeGPU;
            document.getElementById('type-ram').value = text.typeRAM;
            document.getElementById('hard-drive-memory').value = text.hardDriveMemory;
        break;
        case 'ultrabook':
            document.getElementById('ultrabook-create').style.display = 'block';

            document.getElementById('ultrabook-produser').value = text.provider;
            document.getElementById('ultrabook-type').value = text.type;
            document.getElementById('ultrabook-type-cpu').value = text.typeCPU;
            document.getElementById('ultrabook-type-gpu').value = text.typeGPU;
            document.getElementById('ultrabook-type-ram').value = text.typeRAM;
            document.getElementById('ultrabook-hard-drive-memory').value = text.hardDriveMemory;
            document.getElementById('ultrabook-hyper-threading').value = text.hyperThreading;
            document.getElementById('ultrabook-num-cores').value = text.numCores;
            break;
        case 'computerServer':
            document.getElementById('server-create').style.display = 'block';

            document.getElementById('server-produser').value = text.provider;
            document.getElementById('server-type').value = text.type;
            document.getElementById('server-type-cpu').value = text.typeCPU;
            document.getElementById('server-type-gpu').value = text.typeGPU;
            document.getElementById('server-type-ram').value = text.typeRAM;
            document.getElementById('server-hard-drive-memory').value = text.hardDriveMemory;
            document.getElementById('server-hyper-threading').value = text.hyperThreading;
            document.getElementById('server-num-cores').value = text.numCores;
            document.getElementById('server-model-gpu').value = text.modelGPU;
            document.getElementById('server-amount-ram').value = text.amountOfRAM;
            break;
        default:
            throw new Error('Form type is not recognized');
            break;
    };
};

function addFullInfoItem (text) {
    console.log(text);
     switch (text.typeItem){
        case 'computer':
            document.getElementById('info-computer').style.display = 'block'; 

            document.getElementById('info-computer-provider').textContent = text.provider;
            document.getElementById('info-computer-type').textContent = text.type;
            document.getElementById('info-computer-cpu').textContent = text.typeCPU;
            document.getElementById('info-computer-gpu').textContent = text.typeGPU;
            document.getElementById('info-computer-ram').textContent = text.typeRAM;
            document.getElementById('info-computer-hdd').textContent = text.hardDriveMemory;
        break;
        case 'ultrabook':
            document.getElementById('info-ultrabook').style.display = 'block'; 

            document.getElementById('info-ultrabook-provider').textContent = text.provider;
            document.getElementById('info-ultrabook-type').textContent = text.type;
            document.getElementById('info-ultrabook-cpu').textContent = text.typeCPU;
            document.getElementById('info-ultrabook-gpu').textContent = text.typeGPU;
            document.getElementById('info-ultrabook-ram').textContent = text.typeRAM;
            document.getElementById('info-ultrabook-hdd').textContent = text.hardDriveMemory;
            document.getElementById('info-ultrabook-hyper-threading').textContent = text.hyperThreading;
            document.getElementById('info-ultrabook-cores').textContent = text.numCores;
        break;
        case 'computerServer':
            document.getElementById('info-server').style.display = 'block'; 

            document.getElementById('info-server-provider').textContent = text.provider;
            document.getElementById('info-server-type').textContent = text.type;
            document.getElementById('info-server-cpu').textContent = text.typeCPU;
            document.getElementById('info-server-gpu').textContent = text.typeGPU;
            document.getElementById('info-server-ram').textContent = text.typeRAM;
            document.getElementById('info-server-hdd').textContent = text.hardDriveMemory;
            document.getElementById('info-server-hyper-threading').textContent = text.hyperThreading;
            document.getElementById('info-server-cores').textContent = text.numCores;
            document.getElementById('info-server-model-gpu').textContent = text.modelGPU;
            document.getElementById('info-server-amount-ram').textContent = text.amountOfRAM;
        break;
        default:
        throw new Error('Unexpected type item');
     };
};

function createItem (e) { 
    var item;
    switch (e.target.parentNode.id) {
        case 'computer-create':
            var provider = document.getElementById('produser').value;
            var type = document.getElementById('type').value;
            var typeCPU =  document.getElementById('type-cpu').value;
            var typeGPU =  document.getElementById('type-gpu').value;
            var typeRAM =  document.getElementById('type-ram').value;
            var hardDriveMemory = document.getElementById('hard-drive-memory').value;
            item = new Computer(provider,type,typeCPU,typeGPU,typeRAM,hardDriveMemory);
        break;
        case 'ultrabook-create':
            var provider = document.getElementById('ultrabook-produser').value;
            var type = document.getElementById('ultrabook-type').value;
            var typeCPU =  document.getElementById('ultrabook-type-cpu').value;
            var typeGPU =  document.getElementById('ultrabook-type-gpu').value;
            var typeRAM =  document.getElementById('ultrabook-type-ram').value;
            var hardDriveMemory = document.getElementById('ultrabook-hard-drive-memory').value;
            var hyperThreading =  document.getElementById('ultrabook-hyper-threading').value;
            var numCores =  document.getElementById('ultrabook-num-cores').value;
            item  = new Ultrabook(provider,type,typeCPU,typeGPU,typeRAM,hardDriveMemory,hyperThreading,numCores);
            break;
        case 'server-create':
            var provider = document.getElementById('server-produser').value;
            var type = document.getElementById('server-type').value;
            var typeCPU =  document.getElementById('server-type-cpu').value;
            var typeGPU =  document.getElementById('server-type-gpu').value;
            var typeRAM =  document.getElementById('server-type-ram').value;
            var hardDriveMemory = document.getElementById('server-hard-drive-memory').value;
            var hyperThreading =  document.getElementById('server-hyper-threading').value;
            var numCores =  document.getElementById('server-num-cores').value;
            var modelGPU =  document.getElementById('server-model-gpu').value;
            var amountOfRAM =  document.getElementById('server-amount-ram').value;
            item = new ComputerServer(provider,type,typeCPU,typeGPU,typeRAM,hardDriveMemory,hyperThreading,numCores,modelGPU,amountOfRAM);
            break;
        default:
            throw new Error('Form type is not recognized');
            break;
    }

    location.href.slice(-11) ==='create.html'? dbServase.saveItemInDb(JSON.stringify(item)) : dbServase.updateItem(JSON.stringify(item));

    window.location.href = 'index.html';
};

function showForm (e) {
    var formComputer = document.getElementById('computer-create');
    var formUltrabook = document.getElementById('ultrabook-create');
    var formServer = document.getElementById('server-create');
    switch (e.target.id) {
        case 'btn-computer':
            formComputer.style.display = formComputer.style.display === 'block'? 'none' : 'block';
            formUltrabook.style.display = 'none';
            formServer.style.display = 'none';
        break;
        case 'btn-ultrabook':
            formUltrabook.style.display = formUltrabook.style.display === 'block'? 'none' : 'block';
            formComputer.style.display = 'none';
            formServer.style.display = 'none';
        break;
        case 'btn-server':
            formServer.style.display = formServer.style.display === 'block'? 'none' : 'block'; 
            formComputer.style.display = 'none';
            formUltrabook.style.display = 'none';
        break;
    };

};

window.onload = function () {
    if (location.href.slice(-11) === 'create.html') {
        document.getElementById('btn-computer').addEventListener('click',showForm);
        document.getElementById('btn-ultrabook').addEventListener('click',showForm);
        document.getElementById('btn-server').addEventListener('click',showForm);

        document.getElementById('btn-create-computer-item').addEventListener('click',function (e) {
            e.preventDefault();
            createItem(e);  
        });
        document.getElementById('btn-create-ultrabook-item').addEventListener('click',function (e) {
          e.preventDefault();
          createItem(e);  
        });
        document.getElementById('btn-create-server-item').addEventListener('click',function (e) {
          e.preventDefault();
          createItem(e);  
        });
    } else if (location.href.slice(-10) === 'index.html') {
        dbServase.getItmesFromDb(renderItems,deleteItem,getInfoItem,editInfoItem);
        function deleteItem (){ 
            var items = document.querySelectorAll('.btn-delete');
            for (var i = 0; i < items.length; i++) {
                items[i].addEventListener('click',dbServase.deleteItem.bind(dbServase));
            };
        };

        function getInfoItem (){ 
            var items = document.querySelectorAll('.btn-info');
            for (var i = 0; i < items.length; i++) {
                items[i].addEventListener('click', function (e) {
                getId(e); 
               });
            };
        };
        function editInfoItem (){ 
            var items = document.querySelectorAll('.btn-edit');
            for (var i = 0; i < items.length; i++) {
                items[i].addEventListener('click', function (e) {
                getId(e); 
               });
            };
        };
    } else if (location.href.slice(-9) === 'info.html') {
        dbServase.getItem(addFullInfoItem,editItem);
        document.getElementById('at-main').addEventListener('click',function () {
            localStorage.clear();
        })
    } else if (location.href.slice(-9) === 'edit.html') {
          document.getElementById('btn-create-computer-item').addEventListener('click',function (e) {
            e.preventDefault();
            createItem(e);  
        });
        document.getElementById('btn-create-ultrabook-item').addEventListener('click',function (e) {
          e.preventDefault();
          createItem(e);  
        });
        document.getElementById('btn-create-server-item').addEventListener('click',function (e) {
          e.preventDefault();
          createItem(e);  
        });
        dbServase.getItem(addFullInfoItem,editItem);
        document.getElementById('at-main').addEventListener('click',function () {
            localStorage.clear();
        });
    };
 }; 