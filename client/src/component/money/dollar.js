import React,{ useState, useEffect }from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    height: '100%'
  },
})); 
export default function PaperSheet(props) {
  const classes = useStyles();  
  const [amount, setAmount] = useState(0);
  //axios call to get all transactions
    console.log(props.value)
  useEffect(() => {
        let data=async()=>{
            let dollar = Number(props.value).toFixed(2);
            setAmount(dollar)
        }
        data()
  },[]);



    return (
      <div>
        {amount}
      </div>
    );
}