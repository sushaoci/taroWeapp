const action = (type, payload) => ({type, payload});

export default action

/* 
🔴action creator => 用于create一个action（action是view发出的通知，告诉state应该改变了）
type：action的名称
payload：action携带的信息
 */