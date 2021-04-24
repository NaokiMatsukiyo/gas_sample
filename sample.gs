const SPREADSHEET = '1oeNcZfTT3qXbacLp8Z-ecF3HihBmTMP2MV9NV1KB4O0'; //スプレッドシートID
const CALENDAR = [
  {"name":"GASテスト","id":"0q0e1lk53jqtmvhi6b5bttm4gg@group.calendar.google.com"},
  {"name":"GASテスト2","id":"ps3lsd59l889uu9v8cr831kk1c@group.calendar.google.com"},
  {"name":"GASテスト3","id":"n62nmfhfr3tie1uuod1ifu08p0@group.calendar.google.com"}
]
let event_num=0;

function test(){
  for(const cal of CALENDAR){
    console.log(cal.id);
  }
}

function main(){
  for(const cal of CALENDAR){
    const events = getCalendarEvents(cal.id);
    setCalendarEventsToMaster(events,cal.name);
  }
}

function getCalendarEvents(calendar_id) {
  const calendar = CalendarApp.getCalendarById(calendar_id);
  const startTime = new Date('2021/04/01 00:00:00');
  const endTime = new Date('2021/05/01 00:00:00');
  
  return calendar.getEvents(startTime, endTime);
}

function setCalendarEventsToMaster(events,calendar_name) {
  const ss = SpreadsheetApp.openById(SPREADSHEET);
  const sheet = ss.getSheetByName("マスタデータ");

  for(const event of events){
    event_num++;
    console.log(event.getTitle()+"を処理中");
    sheet.getRange(event_num,1).setValue(event.getTitle());
    sheet.getRange(event_num,2).setValue(event.getStartTime());
    sheet.getRange(event_num,3).setValue(calendar_name);
  }
}