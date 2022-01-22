import React, { Component } from "react";
import 'react-toastify/dist/ReactToastify.css'

import {
  Tabs, PageHeader, Typography, Divider, Button, Carousel, List, Icon
} from 'antd';
import 'antd/dist/antd.css';
import { Logo } from '../components/Logo';
import CarouselOne from '../assets/images/bts3.png'
import CarouselTwo from '../assets/images/bts2.jpg'
import CarouselThree from '../assets/images/bts.jpg'
import Display from "../assets/images/dp.png";
import VideoOne from "../assets/images/cover1.png";
import VideoTwo from "../assets/images/cover2.png";
import VideoThree from "../assets/images/cover3.png";
import {Grid} from "@material-ui/core";
import PaddedPaper from "../atoms/PaddedPaper/PaddedPaper";
import DemoCollectibles from "../components/Demo/DemoCollectibles";

// import withStyles from "@material-ui/core/styles/withStyles";

const { TabPane } = Tabs;
const { Title, Paragraph, Text } = Typography;
const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);


const tierData = [{
  title: 'Gold Tier',
  img: 'https://i.imgur.com/4ked98D.jpg',
  description:
    'Only 3 of the gold collectibles are minted to date.',
  content:
    'Limited edition! Buy the gold tier collectibles to be entitled to a 1-to-1 video lesson with' +
    ' Kpop Cover Star! The gold tier also entitles you to exclusive sneak peak to future choreography and ' +
    'shout outs. It also gives you backstage passes to fan meetings and first access to fans merchandise.'
  },{
  title: 'Silver Tier',
  img: 'https://i.imgur.com/0T8rjKK.jpg',
  description:
    'Only 30 of the silver collectibles are minted to date.',
  content:
    'The silver collectible entitles you to preview future choreography videos and shout outs on Kpop ' +
    'Cover Star\'s youtube channel. It also gives you backstage passes to fan meetings and first access to fans' +
    'merchandise.'
  }, {
  title: 'Bronze Tier',
  img: 'https://i.imgur.com/LD85xME.jpg',
  description:
    'Only 100 of the bronze collectibles are minted to date.',
  content:
    'The bronze collectible entitles you to shout outs on Kpop ' +
    'Cover Star\'s youtube channel. It also gives you backstage passes to fan meetings and first access to fans' +
    'merchandise.'
}
];

class MyComponent extends Component {
  render() {
    //console.log(this.props);
    return (
      <div style={{padding: '10px', leftMargin: '50px', fontFamily: 'Helvetica'}}>
        <PageHeader>
          <Logo />
          <Divider />
          <div style={{backgroundColor: '#F0D3F7'}}>
            <div style={{height: 600}}>
              <Carousel autoplay>
                <div>
                  <img src={CarouselOne} alt="Product 1" style={{height: 600, width: '90%', marginLeft: '5%'}}/>
                </div>
                <div>
                  <img src={CarouselTwo} alt="Product 1" style={{height: 600, width: '90%', marginLeft: '5%'}}/>
                </div>
                <div>'
                  <img src={CarouselThree} alt="Product 1" style={{height: 600, width: '90%', marginLeft: '5%'}}/>
                </div>
              </Carousel>
            </div>
            <Grid container spacing={2} alignContent="center" justify="center" style={{padding: '20px'}}>
              <Grid item xs={12} style={{marginLeft: '40%'}}>
                <img src={Display} alt="Display Pic" style={{borderRadius: 30, height: 150, width: 150, display:'inline'}}/>
                <Text strong>Kpop Cover Star</Text>
              </Grid>
                <Grid item xs={3}>
                  <PaddedPaper>
                    <strong>About</strong>
                    <p>Kpop dancer gives personalized shout-outs and patron-only access to the previous episodes of their video series.</p>
                    <p><strong>Recent Uploads</strong></p>
                    <p><img src={VideoOne} alt="Video 1" style={{height: 140, width: 250}}/></p>
                    <p><img src={VideoTwo} alt="Video 2" style={{height: 140, width: 250}}/></p>
                    <p><img src={VideoThree} alt="Video 3" style={{height: 140, width: 250}}/></p>
                    <p><a href='/'>Visit my Channel for more videos!</a></p>
                  </PaddedPaper>
                </Grid>
                <Grid item xs={6}>
                  <PaddedPaper>
                    <List
                      itemLayout="vertical"
                      size="large"
                      dataSource={tierData}
                      renderItem={item => (
                        <List.Item
                          key={item.title}
                          actions={[
                            <IconText type="star-o" text="156" />,
                            <IconText type="like-o" text="156" />,
                            <IconText type="message" text="2" />,
                          ]}
                          extra={
                            <img
                              width={272}
                              alt={item.title}
                              src={item.img}
                              style={{height: 170, width: 170, borderRadius:130}}
                            />
                          }
                        >
                          <List.Item.Meta
                            title={item.title}
                            description={item.description}
                          />
                          {item.content}
                        </List.Item>
                      )}
                    />
                  </PaddedPaper>
                </Grid>
                <Grid item xs={9}>
                  <PaddedPaper>
                    <img 
                      width={640}
                      src="https://i.imgur.com/B9mbi98.png"
                      style={{marginLeft: '25%'}}
                    />
                    <a href="#"><p style={{ 'text-align': 'center' }}>See more posts</p></a>
                  </PaddedPaper>
                </Grid>
            </Grid>
            <Divider />
            <PaddedPaper>
              <Typography>
                <Title level={3}>Creator's Collectibles</Title>
              </Typography>
              <DemoCollectibles account={'0x081d78c21EB0c4f6A051d3c0Da3DA6C240ba3b64'}/>
            </PaddedPaper>
          </div>
        </PageHeader>
      </div>
    )
  }
}

export default MyComponent;