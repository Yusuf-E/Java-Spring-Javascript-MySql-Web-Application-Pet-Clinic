allDiary()
function diaryAdd(){

    const  dtitle = $("#dtitle").val()
    const  ddate = $("#ddate").val()
    const  dnote = $("#dnote").val()
    const  dtime = $("#dtime").val()
    const obj = {
        title: dtitle,
        date: ddate,
        detail: dnote,
        dtime: dtime
    }
    console.log(obj);
    $.ajax({
        url: './diary/add',
        type: 'POST',
        data: JSON.stringify(obj),
        dataType: 'JSON',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            if (data) {
                $("#dtitle").val("")
                $("#dtime").val("")
                $("#dnote").val("")
                $("#dtime").val("")
                console.log(data)
                allDiary()
            } else {
                console.log("İşlem sırasında hata oluştu!")
            }
        },
        error: function (err) {
            console.log(err)
            alert("İşlem sırısında bir hata oluştu!");
        }
    })

}
function allDiary(){

    $.ajax({
        url: './diary/list',
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
let globalArr = []
function createRow( data ) {
    globalArr = data;
    let html = ``
    for (let i = 0; i < data.length; i++) {
        const itm = data [i];
        html += `<tr>
        <th scope="row">`+itm.did+`</th>
        <td>`+itm.title+`</td>
        <td>`+itm.detail+`</td>
        <td>`+itm.date+`</td>
        <td>`+itm.dtime+`</td>
      
      </tr>`
    }
    $('#NotesRow').html(html);
}