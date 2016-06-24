
var pgnavDatatable;
var pgnavTotalItems = 0;
var pgnavItemsPerPage = 5;
var pgnavTotalPages = 0;
var pgnavFrom = 0;
var pgnavTo = 0;

/**
* paginateJSON method creates a table from the JSON object passed.
* 
* pdata - JSON object containing data to be dynamically added to table.
* id - id attribute of the table.
* createTable - (true/false): If true creates table else assumes table exists in page. 
* createHeader - (true/false): If true, creates head row for the table using first row to get header names.
* 
*
*/
function paginateJSON(pdata, tableid, createTable, createHeader) {
		pgnavTotalItems = pdata.length;
    pgnavTotalPages = Math.ceil(pgnavTotalItems / pgnavItemsPerPage);
    
    //drawTable(pdata, tableid, createTable, createHeader);
    pgnavDatatable = $("#"+tableid);
    
    /**
     * Create a Div for pagination controls.
     * Div contains two hidden fields i.e. currentPage and itemsPerPage.
     */
    $('body').append('<div class=controls></div><input id=current_page type=hidden><input id=itemsPerPage type=hidden>');
    $('#current_page').val(0);
    $('#itemsPerPage').val(pgnavItemsPerPage);
   
    var pgnavBlock = '<a class="prev" onclick="navPrevious()">Prev</a>';
    var current_link = 0;
    while (pgnavTotalPages > current_link) {
        pgnavBlock += '<a class="page" onclick="navigateTo(' + current_link + ')" longdesc="' + current_link + '">' + (current_link + 1) + '</a>';
        current_link++;
    }
    pgnavBlock += '<a class="next" onclick="navNext()">Next</a>';

    $('.controls').html(pgnavBlock);
    $('.controls .page:first').addClass('active');
    
    pgnavDatatable.children('tbody').children().css('display', 'none');
    pgnavDatatable.children('tbody').children().slice(0,   pgnavItemsPerPage).css('display', '');    
}

function navigateTo(pageNumber){
 		var itemsPerPage = parseInt($('#pgnavItemsPerPage').val(), 0);

    start_from = pageNumber * pgnavItemsPerPage;

    end_on = start_from + pgnavItemsPerPage;

    pgnavDatatable.children('tbody').children().css('display', 'none').slice(start_from, end_on).css('display', '');

    $('.page[longdesc=' + pageNumber + ']').addClass('active').siblings('.active').removeClass('active');

    $('#current_page').val(pageNumber);
}

function navFirst(){

}

function navLast(){

}

function navPrevious(){
		new_page = parseInt($('#current_page').val(), 0) - 1;
    //if there is an item before the current active link run the function
    if ($('.active').prev('.page').length == true) {
        navigateTo(new_page);
    }
}

function navNext(){
 		new_page = parseInt($('#current_page').val(), 0) + 1;
    //if there is an item after the current active link run the function
    if ($('.active').next('.page').length == true) {
        navigateTo(new_page);
    }
}

function drawTable(data, tableid, createTable, createHeader){

		if(data == null || data == 'undefined'){
    	return;
    }
    if(createTable) {
    	pgnavDatatable = $("<table id='" + tableid + "'></table>");
    } else {
      pgnavDatatable = $("#"+tableid);
    }
    var tablehead = $("<thead />"); 		
    var tablebody = $("<tbody />"); 		
    for (var i = 0; i < data.length; i++) {        
        var datarow = $("<tr />"); 		
        if(createHeader && i == 0) {
          datarow.append($("<th>" + data[i].empid + "</th>"));
          datarow.append($("<th>" + data[i].name + "</th>"));
          datarow.append($("<th>" + data[i].address + "</th>"));
          tablehead.append(datarow);
         
				} else {
    			datarow.append($("<td>" + data[i].empid + "</td>"));
    			datarow.append($("<td>" + data[i].name + "</td>"));
    			datarow.append($("<td>" + data[i].address + "</td>"));
          tablebody.append(datarow);
        }           
    }     
     pgnavDatatable.append(tablehead);
     pgnavDatatable.append(tablebody); 
     
     if(createTable) {
     		$('body').append(pgnavDatatable);         
     }
}
