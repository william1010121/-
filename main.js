class event_get {
    count = 0 
    constructor (){
        this.event_list = new Map()
    }
    add( data ) {
        this.count++;
        this.event_list.set( String(this.count), data)
        refresh_counter( this.count)
    }

}

var event_list = new event_get()
var list_tmp = new Array()
function judge_event(event_1, event_2) {

    //prompt()
    let judge_event1 = document.getElementById('event_judge_1')
    let judge_event2 = document.getElementById('event_judge_2')
    judge_event1 = event_1
    judge_event2 = event_2
    let check = confirm( event_1 + " v.s. "+ event_2) 
    //console.log( check )
    if( check ) {
        return "event1 > event2"
    }
    else 
        return "event1 < event2"
}
async function start_merge_sort( list, l, r) {
    //console.log( l, r)
    let m = ((l+r)-((l+r)%2))/2;
    if( r-l < 2) 
        return;
    start_merge_sort( list, l, m );
    start_merge_sort( list, m, r );
    let l_pos = l, r_pos = m;
    let cur_pos = l;
    //console.log( list_tmp, list)
    //console.log( l, m, r, l_pos, r_pos)
    while( l_pos<m && r_pos<r ) {
        let check = judge_event( list_tmp[l_pos], list_tmp[ r_pos ] )
        //console.log( cur_pos, r_pos, l_pos )
        if( check === "event1 < event2") {
            list[ cur_pos ] = list_tmp[ r_pos ]
        //    console.log(list[cur_pos], list_tmp[ r_pos ])
            ++r_pos;
        }
        else {
            list[ cur_pos ] = list_tmp[ l_pos ]
            ++l_pos;
        }
        cur_pos ++ ;
    }
    while( l_pos<m ) {
        list[ cur_pos ] = list_tmp[ l_pos ]
       cur_pos++; l_pos++;
    }
    while( r_pos<r ) {
        list[ cur_pos ] = list_tmp[ r_pos ]
        cur_pos++; r_pos++;
    }
    for(let i = l; i < r; i++) 
        list_tmp[i] = list[i];
}
function start_decide(){
    alert("請比較每兩個事件,如果左邊的事件較優先則按確認，反之按取消")
    //judge_thing.hidden = false
    //console.log ( 123 )
    //console.log( event_list )
    let event_list_origin = new Array()

    for( const [ key, value ] of event_list.event_list )
        event_list_origin.push( value )
    
    list_tmp = [...event_list_origin]

    start_merge_sort( event_list_origin, 0, event_list_origin.length )
    console.log( event_list_origin )
    show_result( event_list_origin)
}

function show_result( list )  {
    let table = document.getElementsByName('result_table')[0]
    table.innerHTML = ""
    for( i in list) {
        let row = document.createElement('tr')
        let col = document.createElement('td')
        col.innerText = list[i]
        row.appendChild(col)
        table.appendChild(row)
    }

}
function refresh_counter ( time ) {
    let counter = document.getElementById( "counter") 
    counter.innerText = String(time)
}
function delete_event( i ) {
    let event_table = document.getElementById( String("table_event_" + String(i)))
    event_table.remove()

    event_list.event_list.delete( String(i) )
    event_list.count--;
    refresh_counter( event_list.count)
}
function add_todo_list () {
    var t = document.getElementsByTagName("table")
    var input = document.getElementById("input_todo") 
    
    //console.log( input )
    //console.log( input.value )

    let  list = t.to_do_list_table.children[0]

    let row = document.createElement( "tr" ) 
    row.id = "table_event_" + String( event_list.count+1)
    let col = document.createElement( "td" )
    let delete_obj = document.createElement("button")
    
    delete_obj.addEventListener( 'click', delete_event.bind( null, [ event_list.count + 1]) )
    //delete_obj.onclick="delete_event( " + toString(event_list.count+1) +  ")"
    delete_obj.innerText = "刪除"

    col.innerText = input.value
    row.appendChild( col )
    row.appendChild( delete_obj )

    list.appendChild( row )

    event_list.add( input.value);
    input.value = ""
    //console.log( t )
    //console.log( t.to_do_list_table)
    //var list = t.to_do_list_table.children[0]
    //console.log( list.children.length)
    //console.log( list.children[ list.children.length-1 ].children.length)
}

function init () {
    let t = document.getElementsByTagName("table")
    let input = document.getElementById("input_todo") 
    let  list = t.to_do_list_table.children[0]
    list.innerHTML = ""
    event_list.count = 0
    event_list.event_list.clear()
    //console.log( list) 
    refresh_counter( event_list.count)
}

