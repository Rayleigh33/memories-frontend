import React , {useState} from 'react';

import {Container,Grid,Grow, Paper,AppBar,TextField,Button} from "@mui/material";
import Posts from "../Posts/posts"
import Form from "../Form/form"; 
import {useDispatch} from "react-redux";
import { useNavigate,useLocation } from 'react-router-dom';
import { getPostsBySearch } from '../../actions/postsActions';
import Pagination from "../Pagination";
import { MuiChipsInput } from "mui-chips-input";
import "./styles.css";


function useQuery() {
  return new URLSearchParams(useLocation().search);
}


 
const Home = () => {
    const [currentId, setCurrentId] = useState(null);
  
    const dispatch = useDispatch();
    const query = useQuery();
    const navigate = useNavigate();
    const page = query.get("page") || 1;
    const searchQuery = query.get("searchQuery");
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
  
    

    const searchPost = () => {
      if(search.trim() || tags){
        dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
        navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
      }
      else{
        navigate("/");
      }
    };

    const handleKeyPress = (e) => {
      if(e.keyCode === 13){
        searchPost();
      }
    };

    const handleAdd = (tag) => setTags([...tags , tag]);

    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));

  return (
    <Grow in>
        <Container maxWidth="xl">
          <Grid className='gridContain' style={{flexDirection: 'row'}} container justify="space-between" alignItems='stretch' spacing={3}>
              <Grid item xs={12} sm={6} md={7}>
                <Posts setCurrentId={setCurrentId} />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
              <AppBar className="appBarSearch" position="static" color='inherit'>
                <TextField 
                  name='search'
                  variant='outlined'
                  label='Search Memories'
                  fullWidth
                  onKeyPress={handleKeyPress}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <MuiChipsInput 
                  style = {{margin: "10px 0"}}
                  value = {tags}
                  onAddChip={handleAdd}
                  onDeleteChip={handleDelete}
                  label = "Search Tags"
                  variant = "outlined"
                />

                <Button onClick={searchPost} className="searchButton" variant='contained' color='primary'>Search</Button>
              </AppBar>
                <Form currentId={currentId} setCurrentId={setCurrentId}/>
                {(!searchQuery && !tags.length) && (
                  <Paper elevation={6} className="pagination">
                  <Pagination page={page} />
                </Paper>
                )}
                
              </Grid>
          </Grid>
        </Container>
      </Grow>
  )
}

export default Home