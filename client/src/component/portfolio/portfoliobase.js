import React,{ useState, useEffect }from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Axios from 'axios';
import List from './list'
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
            url: 'http://localhost:8080/transaction/51',
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
        console.log('i ',i,'t ',t)
        all.push()
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
            res.forEach((l)=>{
              console.log(l)
            })  
            setList(res)
        }
        data()
  },[]);



    return (
      <div>
        <Paper className={classes.root}>
          <Typography variant="h5" component="h3">
            Portfolio
          </Typography>
          <Typography component="p">
            Your Portfolio
          </Typography>
          <List/>
        </Paper>
      </div>
    );
}