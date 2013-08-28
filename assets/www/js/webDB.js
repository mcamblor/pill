var db;
function init() {
        db = openDatabase("DB Alarmas", "0.1", "Database Alarmas", 2000000);
        if (db) {
            // Database opened
			db.transaction( function(tx) {
				tx.executeSql("CREATE TABLE IF NOT EXISTS crear_alarmas(tratamiento_id integer primary key autoincrement, tratamiento text, medicamento text, dosis_doc integer, dosis_com integer, fecha_inicio date, fecha_termino date, hora_inicio time)");
                tx.executeSql("INSERT INTO crear_alarmas (tratamiento_id,tratamiento,medicamento,dosis_doc,dosis_com,fecha_inicio,fecha_termino,hora_inicio) VALUES (1,'cancer','droga',500,250,'2013-08-20','2013-10-20','12:00')");
                tx.executeSql("INSERT INTO crear_alarmas (tratamiento_id,tratamiento,medicamento,dosis_doc,dosis_com,fecha_inicio,fecha_termino,hora_inicio) VALUES (2,'neumonia','paracetamol',500,250,'2013-08-25','13:10')");

			});
        }

 	   //listAlarmas();
}


function listarModificar(){
		db.transaction( function(tx) {
            tx.executeSql("SELECT * FROM crear_alarmas", [],
                function(tx, result){
                    var alarmas = [];
                    for(var i=0; i < result.rows.length; i++) {
                        alarmas.push([result.rows.item(i)['tratamiento_id'],
								result.rows.item(i)['tratamiento'],
								result.rows.item(i)['medicamento'],
								result.rows.item(i)['dosis_doc'],
								result.rows.item(i)['dosis_com'],
								result.rows.item(i)['fecha_inicio'],
								result.rows.item(i)['fecha_termino'],
								result.rows.item(i)['hora_inicio']]);
                    }
					var place = document.getElementById("modificar");
					if (place.getElementsByTagName("ul").length > 0 )
						place.removeChild(place.getElementsByTagName("ul")[0]);
					var list = document.createElement("ul");
			 
					for ( var i = 0; i < alarmas.length; i++) {
						var item = document.createElement("li");
                        item.setAttribute('li');
						item.innerHTML += "<b>ID Tratamiento: </b>" + alarmas[i][0] + " <b>Tratamiento: </b>" + alarmas[i][1] + " <b>Medicamento: </b>" + alarmas[i][2] + "<b>Dosis Doctor: </b>" + alarmas[i][3] + "<b>Dosis Comprada: </b>" + alarmas[i][4] + "<b>Fecha Inicio: </b>" + alarmas[i][5] + " <b>Fecha Termino: </b>" + alarmas[i][6] + " <b>Hora Inicio: </b>" + alarmas[i][7];
						list.appendChild(item);
					}
					place.appendChild(list);
    });
	});
	
 }

function listarEliminar(){
		db.transaction( function(tx) {
            tx.executeSql("SELECT * FROM crear_alarmas", [],
                function(tx, result){
                    var alarmas = [];
                    for(var i=0; i < result.rows.length; i++) {
                        alarmas.push([result.rows.item(i)['tratamiento_id'],
								result.rows.item(i)['tratamiento'],
								result.rows.item(i)['medicamento'],
								result.rows.item(i)['dosis_doc'],
								result.rows.item(i)['dosis_com'],
								result.rows.item(i)['fecha_inicio'],
								result.rows.item(i)['fecha_termino'],
								result.rows.item(i)['hora_inicio']]);
                    }
					var place = document.getElementById("eliminar");
					if (place.getElementsByTagName("ul").length > 0 )
						place.removeChild(place.getElementsByTagName("ul")[0]);
					var list = document.createElement("ul");
			 
					for ( var i = 0; i < alarmas.length; i++) {
						var item = document.createElement("li");
						item.innerHTML += "<b>ID Tratamiento: </b>" + alarmas[i][0] + " <b>Tratamiento: </b>" + alarmas[i][1] + " <b>Medicamento: </b>" + alarmas[i][2] + "<b>Dosis Doctor: </b>" + alarmas[i][3] + "<b>Dosis Comprada: </b>" + alarmas[i][4] + "<b>Fecha Inicio: </b>" + alarmas[i][5] + " <b>Fecha Termino: </b>" + alarmas[i][6] + " <b>Hora Inicio: </b>" + alarmas[i][7] + "<button onclick='removeAlarmas("+ alarmas[i][0]+")'>Eliminar Alarma</button>";
						list.appendChild(item);
					}
					place.appendChild(list);
    });
	});
	
 }
    

function addAlarmas(tratamiento, medicamento, dosis_doc, dosis_com, fecha_inicio, fecha_termino, hora_inicio) {
	db.transaction( function(tx) {
		tx.executeSql("INSERT INTO crear_alarmas(tratamiento, medicamento, dosis_doc, dosis_com, fecha_inicio, fecha_termino, hora_inicio) VALUES(?,?,?,?,?,?,?)", [tratamiento, medicamento, dosis_doc, dosis_com, fecha_inicio, fecha_termino, hora_inicio]);
	});
	//listar();
}

function removeAlarmas(tratamiento_id) {
	db.transaction(function(tx) {
		tx.executeSql("DELETE FROM crear_alarmas WHERE tratamiento_id=?",[tratamiento_id],listarEliminar);
	})
}// JavaScript Document