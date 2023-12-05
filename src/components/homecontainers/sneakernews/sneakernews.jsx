import * as React from "react";
import { useState } from "react";
import "./sneakernews.scss";
import { useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const SneakerNewsContainer = () => {
  const [newsData, setNewsDtata] = useState([]);
  const fetchData = async () => {
    const url =
      "https://newsapi.org/v2/everything?from=2023-11-29&to=2023-11-29&sortBy=popularity&apiKey=961915f9b4704edfb1854ff5d0c69f1e&language=en&q=nike&searchIn=title&domains=nicekicks.com,sneakernews.com,trendhunter.com,footwearnews.com";

    try {
      const response = await fetch(url);
      const result = await response.json();
      console.log("res", result);
      setNewsDtata(result.articles);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div
      className="sneakerNewsContainer"
      data-aos="fade-left"
      data-aos-duration="2500"
    >
      <h1>#Sneaker News</h1>
      <div>
        {newsData?.length < 1 ? (
          <div>No Products</div>
        ) : (
          <div className="top-news-container">
            {newsData
              ?.map((value) => ({ value, sort: Math.random() }))
              .sort((a, b) => a.sort - b.sort)
              .map(({ value }) => value)
              .slice(0, 4)
              .map((news) => {
                return (
                  <div key={news.publishedAt}>
                    <Card
                      sx={{
                        width: 415,
                        height: 405,
                        marginRight: 8,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <CardMedia
                        sx={{ height: 180 }}
                        image={news.urlToImage}
                        title="green iguana"
                      />
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          sx={{ height: 60, overflowY: "hidden" }}
                        >
                          {news.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {news.description}
                        </Typography>
                      </CardContent>
                      <CardActions sx={{ marginTop: "auto" }}>
                        <Button
                          size="small"
                          onClick={() => window.open(news.url, "_blank")}
                          className="news-readmore"
                        >
                          Read More
                        </Button>
                      </CardActions>
                    </Card>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};
export default SneakerNewsContainer;
