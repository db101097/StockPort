import React,{ useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios'

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

function createData(ticker,shares,total) {
  return { ticker,shares,total };
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
            url: 'http://localhost:8080/stocks/51',
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
        console.log('Stocks ',stocks)
        let tickers=""
        for(let i=0;i<stocks.length;i++){
            let t=stocks[i].ticker+','
            tickers+=t
            rows.push(createData(stocks[i].ticker,stocks[i].shares,stocks[i].total))
        }

        rows.forEach(row=>{
            console.log('Row ',row)
        })
        return rows
        const config ={ 
            method: 'get',
            url: 'https://api.iextrading.com/1.0/tops?symbols='+tickers
        }
        let res=await axios(config)
        let currData=res.data
        console.log('current data ',res)
        return res
    }catch(err){
        console.log(err)
        return false;
    }
}

export default function CustomizedTables() {
  const classes = useStyles();
  const [row, setRow] = useState([]);
  useEffect(() => {
      let data=async()=>{
          let res=await generateRows()  
          setRow(res)
      }
      data()
    },[]);
    console.log('This is rows ',rows)
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <StyledTableCell>Ticker </StyledTableCell>
            <StyledTableCell align="right">Shares</StyledTableCell>
            <StyledTableCell align="right">Total</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <StyledTableRow key={row.ticker}>
              <StyledTableCell component="th" scope="row">
                {row.ticker}
              </StyledTableCell>
              <StyledTableCell align="right">{row.shares}</StyledTableCell>
              <StyledTableCell align="right">{row.total}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}