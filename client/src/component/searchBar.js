import {React,Component} from 'react'
import SearchBar from 'material-ui-search-bar'

class searchBar extends Component{

    constructor(props){
        super(props);
        this.state = {
           searchTerm:"",
        }
    }

    render(){
        return(
            <SearchBar
                onChange={() => console.log('onChange')}
                onRequestSearch={() => console.log('onRequestSearch')}
                style={{
                    margin: '0 auto',
                    maxWidth: 800
                }}
             />
        )
    }
}

export default searchBar;