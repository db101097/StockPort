import React,{ useState,useRef, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'
import Cookies from 'react-cookies'
import Dollar from '../money/dollar'

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

function createData(ticker,shares,total,openPrice,currentPrice,profit,color) {
  return { ticker,shares,total,openPrice,currentPrice,profit,color };
}

const rows = [
];

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
}));

async function getStocks(){
    try{
        const config ={ 
            method: 'get',
            url: 'https://stockportapp.herokuapp.com/stocks/'+Cookies.load('user'),
            headers: {
              Authorization: "Bearer " + Cookies.load('token')
            }
        }
        
        let res=await axios(config)
        let stocks=res.data
        return stocks
    }catch(err){
        console.log(err)
        return false;
    }
}

async function generateRows(){
    try{

        let stocks= await getStocks()
        let rows= new Array()
        for(let i=0;i<stocks.length;i++){
            let color;
            if(stocks[i].openPrice>stocks[i].currentPrice){
              color='red'
            }
            else if(stocks[i].openPrice<stocks[i].currentPrice){
              color='green'
            }
            else{
              color='grey'
            }
            rows.push(createData(stocks[i].ticker,stocks[i].shares,stocks[i].total,stocks[i].openPrice.toFixed(2),stocks[i].currentPrice.toFixed(2),stocks[i].profit.toFixed(2),color))
        }
        return rows
    }catch(err){
        console.log(err)
        return false;
    }
}

let data=async(setRow)=>{
  let res=await generateRows()
  setRow(res)
}

export default function CustomizedTables() {
  const classes = useStyles();
  const [row, setRow] = useState([]);
  const didMountRef = useRef(false);
  
  useEffect(() => {
    if(row.length===0){
      data(setRow)
    }
    },[row.length]);
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <StyledTableCell>Ticker </StyledTableCell>
            <StyledTableCell align="right">Shares</StyledTableCell>
            <StyledTableCell align="right">Total</StyledTableCell>
            <StyledTableCell align="right">Open Price</StyledTableCell>
            <StyledTableCell align="right">Current Price</StyledTableCell>
            <StyledTableCell align="right">Profit</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {row.map(r => (
            <StyledTableRow key={r.ticker}>
              <StyledTableCell component="th" scope="row">
              <font color={r.color}>
                {r.ticker}
              </font>
              </StyledTableCell>
              <StyledTableCell align="right">
              {r.shares}
              </StyledTableCell>
              <StyledTableCell align="right">$ {r.total}</StyledTableCell>
              <StyledTableCell align="right">$ {r.openPrice}</StyledTableCell>
              <StyledTableCell align="right">$ {r.currentPrice}</StyledTableCell>
              <StyledTableCell align="right">$ {r.profit}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}