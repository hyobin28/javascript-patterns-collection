//콜 택시 앱

//퍼사드 패턴
//콜 택시 앱 실행 단계
class Occupant {
  information() {
      console.log("탑승자 정보 입력"); //팩토리 패턴: 출발지, 목적지 설정, 택시 종류 선택, 자동 요금 계산, 결제

      
  }

  boarding_request() {
      console.log("승객: 승차 요청");   //탑승자 정보 입력 + 승차 요청
  }

  feedback() {
      console.log("택시 기사 평가 및 피드백");
      console.log("--------------------");
  }

  arrive_destination() {
      console.log("목적지 도착");     //목적지 도착 + 결제 + 택시 기사 평가 및 피드백
  }
  auto_payment() {
      console.log("자동 결제 진행");
  }
};

class Taxi {
  approval() {
      console.log("택시: 승차 요청 승인");
      console.log("--------------------");
  }
};

class CallTaxiApp {
  constructor() {
    this.user_occupant = new Occupant();    //occupant class연결
    this.user_taxi = new Taxi();            //taxi class연결
  }

  show_information() {                      //탑승자가 정보 입력을 하면 바로 택시 승차 요청
    this.user_occupant.boarding_request(); 
    this.user_occupant.information();
  }

  riding(){                                
    this.user_taxi.approval();              //택시 기사가 요청을 승인
  }

  arrive_action() {                         //목적지에 도착 후 
    this.user_occupant.arrive_destination();
    this.user_occupant.auto_payment();
    this.user_occupant.feedback();
  }
};


//로그인 클래스
class Login {
  constructor() {
    this.users = [
      {num: 1, id: 'kimmilal', password: 'password'},
      {num: 2, id: 'hyobin', password: '123456'}
    ];
    this.currentUser = null;
  }
  
  authenticate(id, password) {
    const user = this.users.find(user => user.id === id);
    if (!user) {
      return false;
    }
  
    if (user.password === password) {
      this.currentUser = user;
      console.log(`아이디: ${user.id}`);
      console.log(`비밀번호: ${user.password}`);
      return true;                                      // 로그인 성공
    }
  
    return false;
  }
  
  getCurrentUser() {
    return this.currentUser;
  }
}



//팩토리 패턴
//고객이 출발지, 목적지 설정, 택시 종류 선택
class OccupantFactory {
  constructor(start_point, end_point, choice_taxi) {
    this.user_name = null;
    this.start_point = start_point;
    this.end_point = end_point;
    this.choice_taxi = choice_taxi;
  }

  static factory(user_name, start_point, end_point, choice_taxi) {
    switch(user_name) {
      case 'kimmilal': return new Occupant_one(user_name, start_point, end_point, choice_taxi);
      case 'hyobin': return new Occupant_two(user_name, start_point, end_point, choice_taxi);
      default:
        return null;
    }
  }
}

class Occupant_one extends OccupantFactory {
  constructor(start_point, end_point, choice_taxi) {
    super(start_point, end_point, choice_taxi);
  }
}

class Occupant_two extends OccupantFactory {
  constructor(start_point, end_point, choice_taxi) {
    super(start_point, end_point, choice_taxi);
  }
}



//옵저버패턴
//콜 택시 앱의 실행 단계에 따라 앱을 사용하는 고객(탑승자)에게 보내지는 알림
class TaxiAlarm {
  constructor() {
    this.observers = [];
  }

  attach(observer) {
    this.observers.push(observer);
  }

  detach(observer) {
    this.observers = this.observers.filter(e => e !== observer);
  }

  notify() {
    this.observers.forEach(e => e.update());
  }

  app_login() {
    console.log('*앱에 로그인을 해주세요.*'); 
  }

  login_success() {
    console.log('*로그인이 완료되었습니다.*');
    console.log("--------------------");
  }

  login_fail() {
    console.log('*아이디 또는 패스워드가 틀렸습니다.*'); 
  }

  calling(taxi) {
    this.taxi = taxi;
    if(taxi == 'Black'){
      console.log('*Black 택시 호출중입니다. 잠시만 기다려주세요 :)*'); 
    }
    else if(taxi == 'Blue'){
      console.log('*Blue 택시 호출중입니다. 잠시만 기다려주세요 :)*');
    }
    else{
      console.log('*택시를 잘못 선택하였습니다.*');
    }
  }

  feedback() {
    console.log('*하차가 완료되었습니다. 택시 기사에 대한 피드백을 남겨주세요.*'); 
  }
};

class Observer {
  set_alarm(alarm) {
    this.alarm = alarm;  
    this.alarm.attach(this);  
  }

  update() {
    this.alarm.load();  
  }
};



// 실행 예시
const calltaxiapp = new CallTaxiApp();
const taxiAlarm = new TaxiAlarm();    // taxiAlarm 클래스 생성
const observer = new Observer();    //옵저버
observer.set_alarm(taxiAlarm);

const login = new Login();    //로그인클래스생성
const id = 'kimmilal'; //아이디 입력
const password = 'password'; //비밀번호 입력
const occupant_one = new OccupantFactory('한국성서대학교', '노원역', 'Blue');     //승객1
const occupant_two = new OccupantFactory('노원역', '하계역', 'Black');           //승객2

taxiAlarm.app_login();

//id과 password가 login클래스에 입력된 값과 같은지 확인
if(login.authenticate(id, password)) { 
  const currentUser = login.getCurrentUser();
  taxiAlarm.login_success();                      //맞으면 옵저버패턴을 통해' 로그인 완료되었다'는 알림 감

  if(currentUser.id === 'kimmilal'){
    occupant_one.user_name = currentUser.id;      //로그인 이름을 승객클래스에 넣기
    calltaxiapp.show_information();               //탑승자정보
    console.log(`아이디: ${occupant_one.user_name}, 출발지: ${occupant_one.start_point}, 목적지: ${occupant_one.end_point}, 택시선택: ${occupant_one.choice_taxi}`);
    console.log("--------------------");
    taxiAlarm.calling(occupant_one.choice_taxi);  //택시 종류에 따라 '택시호출중입니다' 출력
    calltaxiapp.riding();
    calltaxiapp.arrive_action();      //도착후 이벤트
    taxiAlarm.feedback();
  }
  
  else if(currentUser.id === 'hyobin'){
    occupant_two.user_name = currentUser.id;      
    calltaxiapp.show_information();              
    console.log(`아이디: ${occupant_two.user_name}, 출발지: ${occupant_two.start_point}, 목적지: ${occupant_two.end_point}, 택시선택: ${occupant_two.choice_taxi}`);
    console.log("--------------------");
    taxiAlarm.calling(occupant_one.choice_taxi);  
    calltaxiapp.riding();
    calltaxiapp.arrive_action();     
    taxiAlarm.feedback();
  }
  
}
else {
  taxiAlarm.login_fail();             //로그인이 되지 않았을 때 나오는 메세지
}