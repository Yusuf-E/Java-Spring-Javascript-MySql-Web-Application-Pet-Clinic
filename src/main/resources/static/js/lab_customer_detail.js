function allCustomer(){
    $.ajax({
        url: './lab-detail/listt',
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
allCustomer()

function createRow( data ) {
    globalArr = data;
    let html = ``
    for (let i = 0; i < data.length; i++) {
        const itm = data[i];
        html += `<tr>
        <td>
        <b>Adı Soyadı: </b>`+itm.cname+" "+ itm.csurname+`
        </td>
        </tr>
        <tr><td><b>Telefon: </b> `+itm.mobile_phone+`</td></tr>
        <tr><td><b>TC: </b>`+itm.tax+`</td></tr>
           <tr><td><b>Not: </b>`+itm.cnote+`</td></tr>
        <tr><td><b>Adres: </b> `+itm.caddress+`</td></tr>
        
      `;
    }
    $('#customerRow').html(html);
}
allCustomer()