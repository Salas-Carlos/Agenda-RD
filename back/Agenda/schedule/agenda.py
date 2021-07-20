from apscheduler.schedulers.background import BackgroundScheduler
from twilio.rest import Client



def start():
  scheduler = BackgroundScheduler()
  scheduler.add_job(holamundo, 'interval', seconds = 3)
  scheduler.start()



def holamundo():
    account_sid = "AC59fe32f504bd28a9e2451a8a4835cee0"
# Your Auth Token from twilio.com/console
    auth_token  = "0f1b94deaf14a5a3c0441c3a9fdb2034"
    
    client = Client(account_sid, auth_token)
  
    message = client.messages.create( 
                              from_='whatsapp:+14155238886',  
                              body='oe, soy Salas... escribeme a mi verdadero numero si te llega este mensaje',      
                              to='whatsapp:+573168635821' 
                          ) 

    print(message.sid)


    