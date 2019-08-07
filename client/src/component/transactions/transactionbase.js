import React,{ useState, useEffect }from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from './ex'
import Axios from 'axios';
import ExpansionPanel from './expansion'
import cookie from 'react-cookies'
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    height: '100%'
  },
}));


const getData=async()=>{
    try{
        const config={
            method: 'get',
            url: 'http://localhost:8080/transaction/'+cookie.load('user'),
            headers: {
              Authorization: "Bearer " + cookie.load('token')
            }
        }
        let res=await Axios(config)
        console.log(res)
        return {
          status:true,
          data:res.data
        }
    }catch(err){
        return {
          status:false,
          error:'Failed To Get Transactions'
        }
    } 

}

const generateList=async()=>{
  let transactions=await getData()
    if(transactions.status!==true){
        return transactions.status
    }
    else{
      let all= new Array()
      console.log('data is this long ',transactions.data.length)
      for(let i=0;i<transactions.data.length;i++){
        let t=transactions.data[i]
        all.push(<ExpansionPanel 
                    panel={'panel'+i} 
                    ariaControl={'panel'+i+'bh-content'}
                    ticker={t.ticker}
                    type={t.type}
                    total={t.total}
                    shares={t.shares}
                    cost={t.cost}
                    date={t.date}   />)
      }

      return all;
    }
}


export default function PaperSheet() {
  const classes = useStyles();  
  const [list, setList] = useState([]);
  //axios call to get all transactions

  useEffect(() => {
      console.log('Length of list',list.length)
        console.log('here')
        let data=async()=>{
            let res=await generateList()
            setList(res)
        }
        data()
  },[]);



    return (
      <div>
        <Paper className={classes.root}>
          <Typography variant="h5" component="h3">
            Transactions
          </Typography>
          <Typography component="p">
            Your Transactions
          </Typography>
          <List panel={list}/>
        </Paper>
      </div>
    );
}