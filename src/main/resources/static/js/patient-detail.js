function allPatient(){
    $.ajax({
        url: './patientDetail/list',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            console.log(data)
            createRow(data)
        },
        error: function (err){
            console.log(err)
        }
    })
}
allPatient()

function createRow( data ) {
    globalArr = data;
    let html = ``
    for (let i = 0; i < data.length; i++) {
        const itm = data[i];
        html += `<tr>
        <td>
        <b>Durumu: </b>`+itm.cbarren+`
        </td>
        </tr>
        <tr><td><b>Cinsi: </b> `+itm.ckind+`</td></tr>
        <tr><td><b>Cinsiyet: </b>`+itm.cgender+`</td></tr>
         <tr><td><b>Dogum Tarihi: </b>`+itm.cbirth+`</td></tr>
        <tr><td><b>Renk: </b> `+itm.pColor+`</td></tr>
        <tr><td><b>Karne No: </b> `+itm.creport+`</td></tr>
        <tr><td><b>Çip No: </b> `+cchip+`</td></tr>
        
      `;
    }
    $('#labPatientRow').html(html);
}
allPatient()