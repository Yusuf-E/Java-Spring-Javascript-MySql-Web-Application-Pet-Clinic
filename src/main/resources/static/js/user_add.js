let uui = 0;
/*User Get - start*/
allUser()
function allUser(){

    $.ajax({
        url: './users/list',
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
        <th scope="row">`+itm.uid+`</th>
        <td>`+itm.username+" "+ itm.usersurname+`</td>
        <td>`+itm.userphone+`</td>
        <td>`+itm.useremail+`</td>
        <td>`+itm.userstatus+`</td>
        <td class="text-right" >
              <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                <button onclick="fncUserDelete(`+itm.uid+`)" type="button" class="btn btn-outline-primary "><i class="far fa-trash-alt"></i></button>
                <button onclick="fncUserUpdateRow(`+i+`)" data-bs-toggle="modal" data-bs-target="#userUpdate" type="submit" class="btn btn-outline-primary "><i class="fas fa-pencil-alt"></i></button>
              </div>
            </td>
      </tr>`
    }
    $('#userRow').html(html);
}
/*User Get - end*/
// User delete - start
function fncUserDelete( uid ) {
    let answer = confirm("Silmek istediğinizden emin misniz?");
    if ( answer ) {

        $.ajax({
            url: './users/delete/'+uid,
            type: 'GET',
            dataType: 'text',
            success: function (data) {
                if ( data != "0" ) {
                    allUser();
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
// User delete - end

// User update - start
// supplier update - start
function fncUserUpdateRow( i ) {
    const itm = globalArr[i];
    console.log(itm.userimage.imagename)
    console.log(itm)
    console.log(itm.roles)
    uui = itm.uid
    console.log(uui)
    $("#username-update").val(itm.username)
    $("#usersurname-update").val(itm.usersurname)
    $("#useremail-update").val(itm.useremail)
    $("#utype-update").val(itm.roles.rid)
    $("#userphone-update").val(itm.userphone)
    $("#uid").val(uui);
    if (itm.userstatus== 'Aktif') {
        $('#userstatus-update').prop('checked', true);
    }
    else {
        $('#userstatus-update').prop('checked', false);
    }

}
