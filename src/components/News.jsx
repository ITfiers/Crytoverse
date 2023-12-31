import React from 'react'
import { Select, Typography, Row, Col, Avatar, Card } from 'antd'
import moment from 'moment'
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi'
import { useState } from 'react'
import { MYDATA } from '../services/testData'
import Loader from './Loader'

const { Text, Title } = Typography;
const { Option } = Select;
const demoImage = "https://www.bing.com/th?id=OVFT.oOTflFojdrpnaRCmqWUr7i&pid=News"
const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
  const { data} = MYDATA;
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 12 })
  //console.log({ cryptoNews, isFetching })
  if (!cryptoNews?.value) return <Loader/>;
  return (
    <>
      <Row gutter={[24, 24]}>
        {
          !simplified && (
            <Col span={24}>
              <Select
                showSearch
                className='select-news'
                placeholder='Select a Crypto'
                onChange={(value) => setNewsCategory(value)} // EtH ->eth    // {value: "ABC Eherium"} -> binan
                filterOption={(input, option) => {
                  return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }}
              >
                <Option value="Cryptocurrency"></Option>
                {data?.coins.map((coin) => (<Option value={coin.name}>{coin.name}</Option>))}
              </Select>
            </Col>
          )
        }
        {
          cryptoNews?.value?.map((news, i) => (
            <Col xs={24} sm={12} lg={8} key={i}>
              <Card hoverable className='news-card'>
                <a href={news.url} target='_blank' rel='noreferrer' >
                  <div className="news-image-container">
                    <Title className='news-title' level={4}>
                      {news.name}
                    </Title>
                    <img style={{ maxWidth: "200px", maxHeight: "150px" }} src={news?.image?.thumbnail?.contentUrl || demoImage} alt="news" />
                  </div>
                  <p>
                    {
                      news.description > 100 ? `${news.description.substring(0, 100)}...` : news.description
                    }
                  </p>
                  <div className="provider-container">
                    <div >
                      <Avatar src={news.provider[0].image?.thumbnail?.contentUrl || demoImage} alt="news" style={{ marginRight: '5px' }} />
                      <Text className='provider-name'>{news.provider[0]?.name}</Text>

                    </div>
                    <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>

                  </div>
                </a>

              </Card>
            </Col>

          ))
        }

      </Row>
    </>
  )
}

export default News
