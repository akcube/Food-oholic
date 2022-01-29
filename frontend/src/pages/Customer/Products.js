// material
import { Box, Grid, Container, Typography, Button, Stack } from '@mui/material';
import { useState, useContext, useEffect } from 'react';
// components
import Page from '../../components/Page';
import CustomerProductCard from '../../components/_dashboard/products/CustomerProductCard';
import { GetAllProducts } from '../../services/food.service';
import { AuthContext } from '../../services/authContext';
import useAsyncEffect from "use-async-effect";
import { GetAllVendors } from '../../services/vendor.service';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import ProductFilterSidebar from '../../components/_dashboard/products/ProductFilterSidebar'
import { useForm } from 'antd/lib/form/Form';
import { TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import FuzzySearch from 'fuzzy-search';
import { GetCustomer } from '../../services/customer.service';
import { pink } from '@mui/material/colors';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Switch, ToggleButton } from '@mui/material';

const CustomerProducts = () => {

    const [PRODUCTS, setProducts] = useState([]);
    const [ALLPRODUCTS, setAllProducts] = useState([]);
    const [DISABLEDPRODUCTS, setDisabledProducts] = useState([]);
    const [VENDORS, setVendors] = useState([]);
    const [TAGS, setTags] = useState([]);
    const context = useContext(AuthContext);
    const [openFilter, setOpenFilter] = useState(false);
    const [sortingOption, setSortingOption] = useState('ratingDSC');
    const [form] = useForm();
    const [favorites, setFavorites] = useState([]);
    const [favoritesMode, setMode] = useState(0);
    const searcher = new FuzzySearch(ALLPRODUCTS, ['name'], {sort: true});

    const handleOpenFilter = () => {
      setOpenFilter(true);
    };
  
    const handleCloseFilter = () => {
      setOpenFilter(false);
    };

    const getRating = a => {
      if(a.rating.sum_rating == 0) return 0;
      else return Number(a.rating.sum_rating) / Number(a.rating.num_rated);
    }

    const ascPrice = (a, b) => {
      if(a.price < b.price) return -1;
      else if(a.price > b.price) return 1;
      else return 0;
    }

    const dscPrice = (a, b) => {
      if(a.price < b.price) return 1;
      else if(a.price > b.price) return -1;
      else return 0;
    }

    const ascRating = (a, b) => {
      if(getRating(a) < getRating(b)) return -1;
      else if(getRating(a) > getRating(b)) return 1;
      else return 0;
    }

    const dscRating = (a, b) => {
      if(getRating(a) < getRating(b)) return 1;
      else if(getRating(a) > getRating(b)) return -1;
      else return 0;
    }

    const getVendorFL = (product, vendors) => {
      for(var v in vendors){
        if(vendors[v]._id === product.vendor) return vendors[v];
      }
    }

    useAsyncEffect(async () => {
        let cust = await GetCustomer(context, context.data.user.type_id);
        if(cust.success) setFavorites(cust.data.favorites);

        let res = await GetAllProducts(context);
        for (var p of res){
          p.price = p.price.toString();
          for (var a of p.addons){
            a.price = a.price.toString();
          }
        }
        res.sort(dscRating);
        let vendorsList = await GetAllVendors(context);
        var tags = [];
        for(var v in res)
          for(var t in res[v].tags) tags.push(res[v].tags[t].tag);
        tags = tags.filter(function(item, i, ar){ return ar.indexOf(item) === i; });   
        
        var curDate = new Date();
        let dis = [];
        for(var p in res){
          let vendo = getVendorFL(res[p], vendorsList);
          var opent = new Date(vendo.business_hours.open);
          var closet = new Date(vendo.business_hours.close);
          var start = opent.getHours()*60 + opent.getMinutes();
          var end = closet.getHours()*60 + closet.getMinutes();
          var cur = curDate.getHours()*60 + curDate.getMinutes();

          if(!(cur >= start && cur <= end)){
            dis.push(res[p]);
          }
        }

        res = res.filter((item) => {
          return !dis.includes(item);
        })

        setDisabledProducts(dis);
        setTags(tags);
        setVendors(vendorsList);
        setAllProducts(res);
        setProducts(res);
      }, []);

    useEffect(()=>{
      if(favoritesMode === 1){
        let newp = PRODUCTS.filter((product)=>{
          return favorites.includes(product._id);
        });
        setProducts(newp);
      }
      else setProducts(ALLPRODUCTS);
    }, [favoritesMode, favorites]);

    const ProductList = ({ products, ...other }) => {
    return (
        <Grid container spacing={3} {...other}>
        {products.map((product) => (
            <Grid key={product._id} item xs={12} sm={6} md={3}>
              <CustomerProductCard product={product} vendors={VENDORS}
                favorites={favorites} setFavorites={setFavorites} setoff={false}/>
            </Grid>
        ))}
        </Grid>
        );
    }

    const DisabledProductList = ({ products, ...other }) => {
      return (
        <>
          <Typography style={{marginTop: 20, marginBottom: 10}} variant='h3'> Unavailable </Typography>
          <Grid container spacing={3} {...other}>
          {products.map((product) => (
              <Grid key={product._id} item xs={12} sm={6} md={3}>
                <CustomerProductCard product={product} vendors={VENDORS}
                  favorites={favorites} setFavorites={setFavorites} setoff={true}/>
              </Grid>
          ))}
          </Grid>
        </>
        );
    }

    const getVendor = id => {
      for(var v in VENDORS)
        if(VENDORS[v]._id == id) return VENDORS[v];
    }

    const filtersSet = val => {
      var filteredProducts = [];
      console.log(val);
      for(var v in ALLPRODUCTS){
        if(!val.allowed_vendors.includes(getVendor(ALLPRODUCTS[v].vendor).shop_name)) continue;
        if(ALLPRODUCTS[v].isVeg && !val.food_type.includes('Vegetarian')) continue;
        if(!ALLPRODUCTS[v].isVeg && !val.food_type.includes('Non-Vegetarian')) continue;
        if(Number(ALLPRODUCTS[v].price) < val.price_range[0] || Number(ALLPRODUCTS[v].price) > val.price_range[1]) continue;
        let valid = false;
        for(var t in ALLPRODUCTS[v].tags)
          if(val.food_tags.includes(ALLPRODUCTS[v].tags[t].tag)) valid = true;
        if(!valid) continue;
        filteredProducts.push(ALLPRODUCTS[v]);
      }
      if(sortingOption == 'ratingDSC') filteredProducts.sort(dscRating);
      else if(sortingOption == 'ratingASC') filteredProducts.sort(ascRating);
      else if(sortingOption == 'priceDSC') filteredProducts.sort(dscPrice);
      else if(sortingOption == 'priceASC') filteredProducts.sort(ascPrice);
      console.log(filteredProducts);
      setProducts(filteredProducts);
    }
    
    const menuClicked = val => {
      setSortingOption(val.key);
      let res = PRODUCTS;
      if(val.key == 'ratingDSC') res.sort(dscRating);
      else if(val.key == 'ratingASC') res.sort(ascRating);
      else if(val.key == 'priceDSC') res.sort(dscPrice);
      else if(val.key == 'priceASC') res.sort(ascPrice);
      setProducts(res);
    }

    const fuzzsearch = event => {
      let res = searcher.search(event.target.value);
      setProducts(res);
    }
    
    const OPTIONS = {
      'ratingASC' : 'Rating: Low-High',
      'ratingDSC' : 'Rating: High-Low',
      'priceASC' : 'Price: Low-High',
      'priceDSC' : 'Price: High-Low'
    }

    const menu = (
      <Menu onClick={menuClicked}>    
        <Menu.Item size='large' key='ratingDSC'>
          Rating: High-Low
        </Menu.Item>
        <Menu.Item size='large' key='ratingASC'>
          Rating: Low-High
        </Menu.Item>
        <Menu.Item size='large' key='priceDSC'>
          Price: High-Low
        </Menu.Item>
        <Menu.Item size='large' key='priceASC'>
          Price: Low-High
        </Menu.Item>
      </Menu>
    );  

    const toggleFavorites = () => {
      setMode(favoritesMode ^ 1);
    }

    return (
        <>
        <Page title="Dashboard: Food items">
          <Container>
            <Typography variant="h3" sx={{ mb: 2 }}>
              Available items
            </Typography>
            <Stack
              direction="row"
              flexWrap="wrap-reverse"
              alignItems="center"
              justifyContent="flex-end"
              sx={{ mb: 5 }}
            >
              <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }} style={{width: '100%'}}>
                <TextField style={{width: '100%'}} 
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={fuzzsearch}
                label="Search products" id="search_bar" />
                {/* <Switch defaultChecked label='favorites' color='error' /> */}
                <ToggleButton
                  value="check"
                  color='error'
                  selected={(favoritesMode===1)}
                  onChange={toggleFavorites}
                >
                  {
                    (favoritesMode===0) ? <FavoriteBorderOutlinedIcon color='error'/> : <FavoriteIcon color='error'/>
                  }
                </ToggleButton>
                <ProductFilterSidebar
                  form={form}
                  filtersSet={filtersSet}
                  isOpenFilter={openFilter}
                  onOpenFilter={handleOpenFilter}
                  onCloseFilter={handleCloseFilter}
                  TAGS={TAGS}
                  VENDORS={VENDORS}
                />
                <Dropdown overlay={menu} style={{width: '100%'}}>
                  <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                  <Button
                    disableRipple
                    color="primary"
                  >
                    {OPTIONS[sortingOption]}&nbsp;
                  </Button>
                  <DownOutlined />
                  </a>
                </Dropdown>
              </Stack>
            </Stack>
            <ProductList products={PRODUCTS} />
            <DisabledProductList products={DISABLEDPRODUCTS} />
          </Container>
        </Page>
        </>
      );
}

export default CustomerProducts;