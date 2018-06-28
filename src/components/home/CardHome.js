import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: "100%",
    height: "100%"
  },
  subheader: {
    width: "100%"
  }
});

const tileData = [
  {
    img: "https://codesandbox.io/static/img/banner.png",
    title: "Lisa",
    author: "jill111",
    cols: 2,
    featured: true
  },
  {
    img:
      "https://habrastorage.org/webt/7z/ja/il/7zjailca5a5ksya71ajsbfbdxvk.png",
    title: "Murge",
    author: "director90"
  },
  {
    img: "https://i.ytimg.com/vi/v5KzBPUEgGQ/maxresdefault.jpg",
    title: "Homer",
    author: "Danson67"
  },
  {
    img:
      "https://cdn-images-1.medium.com/max/1687/1*FDNeKIUeUnf0XdqHmi7nsw.png",
    title: "Morning",
    author: "fancycrave1",
    featured: true
  },
  {
    img: "https://proglib.io/wp-content/uploads/2017/02/flexbox-css.png",
    title: "Hats",
    author: "Hans"
  },
  {
    img:
      "https://www.androidhive.info/wp-content/uploads/2015/04/material-design-banner.jpg",
    title: "Honey",
    author: "fancycravel"
  },
  {
    img: "https://tproger.ru/wp-content/uploads/2016/10/reactmini.png",
    title: "Vegetables",
    author: "jill111",
    cols: 2
  },
  {
    img: "https://walde.co/wp-content/uploads/2016/08/npm-coaster.png",
    title: "Water plant",
    author: "BkrmadtyaKarki"
  },
  {
    img: "https://www.magnatag.com/img/products/PIM/PIMcover.png",
    title: "Mushrooms",
    author: "PublicDomainPictures"
  },
  {
    img:
      "https://i2.wp.com/databear.com/wp-content/uploads/2017/06/Inventory.png?fit=3259%2C1845&ssl=1",
    title: "Olive oil",
    author: "congerdesign"
  },
  {
    img:
      "https://terillium.com/wp-content/uploads/2016/07/inventory-dashboard.png",
    title: "Sea star",
    cols: 2,
    author: "821292"
  },
  {
    img:
      "http://media.comicbook.com/2018/04/alex-ross-explains-difference-marvel-dc-characters-1098199.jpeg",
    title: "Bike",
    author: "danfador"
  }
];

function ImageGridList(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <GridList cellHeight={160} className={classes.gridList} cols={3}>
        {tileData.map(tile => (
          <GridListTile key={tile.img} cols={tile.cols || 1}>
            <img src={tile.img} alt={tile.title} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

ImageGridList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ImageGridList);
