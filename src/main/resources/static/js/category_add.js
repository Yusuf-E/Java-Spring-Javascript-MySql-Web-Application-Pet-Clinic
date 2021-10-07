let catid = 0;
/*Category Add - start*/

allCategory()

$('#form-category').submit( (event) =>{
    event.preventDefault();

    const  categoryname = $("#categoryname").val()

    const obj = {
        categoryname: categoryname
    }
    $.ajax({
        url: './category/add',
        type: 'POST',
        data: JSON.stringify(obj),
        dataType: 'JSON',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            if (data) {
                $("#categoryname").val("")
                console.log(data)
                allCategory()
            } else {
                console.log("İşlem sırasında hata oluştu!")
            }
        },
        error: function (err) {
            console.log(err)
            alert("İşlem sırısında bir hata oluştu!");
        }
    })
})

function allCategory(){

    $.ajax({
        url: './category/list',
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
        <th scope="row">`+itm.caid+`</th>
        <td>`+itm.categoryname+`</td>
        <td class="text-right" >
              <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                <button onclick="fncCategoryDelete(`+itm.caid+`)" type="button" class="btn btn-outline-primary "><i class="far fa-trash-alt"></i></button>
                <button onclick="fncCategoryUpdateRow(`+i+`)" data-bs-toggle="modal" data-bs-target="#categoryUpdate" type="submit" class="btn btn-outline-primary "><i class="fas fa-pencil-alt"></i></button>
              </div>
            </td>
      </tr>`
    }
    $('#categoryRow').html(html);
}

function fncCategoryDelete( caid ) {
    let answer = confirm("Silmek istediğinizden emin misniz?");
    if ( answer ) {

        $.ajax({
            url: './category/delete/'+caid,
            type: 'GET',
            dataType: 'text',
            success: function (data) {
                if ( data != "0" ) {
                    allCategory()
                }else {
                    alert("Silme sırasında bir hata oluştu!");
                }
            },
            error: function (err) {
                console.log(err)
            }
        })
    }
}

function fncCategoryUpdateRow( i ) {
    const itm = globalArr[i];
    catid = itm.caid
    $("#categoryupdatename").val(itm.categoryname)

}

$('#form-category-update').submit( (event) =>{
    event.preventDefault();
    const caid = catid;

    const  categoryname = $("#categoryupdatename").val()

    const obj = {
        caid:caid,
        categoryname: categoryname
    }
    $.ajax({
        url: './category/add',
        type: 'POST',
        data: JSON.stringify(obj),
        dataType: 'JSON',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            if (data) {
                catid = 0
                $("#categoryname").val("")
                console.log(data)
                allCategory()
            } else {
                console.log("İşlem sırasında hata oluştu!")
            }
        },
        error: function (err) {
            console.log(err)
            alert("İşlem sırısında bir hata oluştu!");
        }
    })
})
