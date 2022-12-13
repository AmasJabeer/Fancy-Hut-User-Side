import React, { useState, useEffect, useRef, useContext } from 'react'
import SendMessage from './SendMessage'
import {addDoc, collection, onSnapshot, query, where, updateDoc, doc, deleteDoc ,orderBy } from "firebase/firestore";
import {auth, db} from "../../utils/firebase/firebase.utils";
import {firebaseContext} from '../../context/FirebaseContext';
function Chat() {
    const scroll = useRef()
    const {user} = useContext(firebaseContext)
    const [messages, setMessages] = useState([]);
    const updateMessageStatus = async (messageId)=> {
        console.log('update method called', messageId)
        const orderRef = doc(db, 'Messages', messageId)
        try{
            const res = await updateDoc(orderRef, {
                status: "READ",
            });
            console.log('message status update success', res);
        } catch (err) {
            alert(err)
        }
    }
    // const { uid } = auth.currentUser;
    useEffect(() => {
        const q = query(collection(db, 'Messages'), orderBy('createdAt'))
        onSnapshot(q, (querySnapshot) => {
            let newMessage = querySnapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    data: doc.data()
                }
            });
            setMessages(querySnapshot.docs.map(doc => doc.data()));
            newMessage.map((message)=> {
                    console.log({message})
                          if((message.data.status == 'UNREAD' || message.data.status == undefined)){
                            updateMessageStatus(message.id);
                          }
            })
        })
    }, [])
    return (
        <div className='mb-5 p-5' >
            <div className='mb-5'>
                <h3>SEND US A MESSAGE</h3>
            </div>
            <div className="msgs">
                {messages.map(({ id, text, photoURL, uid }) => (
                    <div>
                        <div key={id} className={`msg ${uid === auth.currentUser.uid ? 'sent' : 'received'}`}>
                            <img className={'imgPhoto'} src={photoURL} alt="" style={{width: '15px', height: '15px'}}/>
                            <p>{text}</p>
                        </div>
                    </div>
                ))}
            </div>
            <SendMessage scroll={scroll} />
            <div ref={scroll}></div>
        </div>
    )
}

export default Chat
