import styled from 'styled-components';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PaidIcon from '@mui/icons-material/Paid';
import EventIcon from '@mui/icons-material/Event';
import Image from 'next/image';
import { ethers } from 'ethers';
import CampaignFactory from '../artifacts/contracts/Campaign.sol/CampaignFactory.json'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAlchemy } from '../components/Hooks/Connection';

export default function Dashboard() {

  const {provider,smartAccount, smartAccountAddress,connect} = useAlchemy();
  const [campaignsData, setCampaignsData] = useState([]);

  const QueryURL = " https://api.studio.thegraph.com/query/54911/funddao/v0.0.1";

  // campaignCreateds(first: 5) {
  //   id
  //   title
  //   requiredAmount
  //   owner
  // }

  const query = `
    {
      campaignCreateds(first: 5) {
      id
      title
      requiredAmount
      owner
      }
    }
  `;

  const client = createClient({
    url: QueryURL
  });



  useEffect(() => {

    if (!client) {
      return;
    }

    const getTokens = async () => {
      try {
        const { data } = await client.query(query).toPromise();
        setTokens(data.campaignCreateds);
        setIsLoading(false); // Data is loaded
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getTokens();

    connect();
    const Request = async () => {
      

      const provider = new ethers.providers.JsonRpcProvider(
        "https://sepolia-rpc.scroll.io/"
      );
  
      const contract = new ethers.Contract(
        "0xDd4468c13cef4E3159afd8801EFC7f8E5fAc882e",
        CampaignFactory.abi,
        provider
      );



      // if (smartAccountAddress === undefined) {
      //   // You can show a loading spinner or any other loading indicator here
      //   return <div>PLEASE GO TO DASHBOARD...</div>;
      // }
      const getAllCampaigns = contract.filters.campaignCreated(null, null, "0xDd4468c13cef4E3159afd8801EFC7f8E5fAc882e");
      const AllCampaigns = await contract.queryFilter(getAllCampaigns);
      const AllData = AllCampaigns.map((e) => {
      return {
        title: e.args.title,
        image: e.args.imgURI,
        owner: e.args.owner,
        timeStamp: parseInt(e.args.timestamp),
        amount: ethers.utils.formatEther(e.args.requiredAmount),
        address: e.args.campaignAddress
      }
      })  
      setCampaignsData(AllData)
    }
    Request();
  },[client])

  return (
    <HomeWrapper>

      {/* Cards Container */}
      <CardsWrapper>

        {isLoading ? (
        // Show loading indicator while data is being fetched
        <div>Loading...</div>
      ) : tokens.length > 0 ? (
        tokens.map((token) => (
          <div className="subcnt" key={token.id}>
            <div className="container-fluid" style={{ width: "100%" }}>
              <table
                className="tb"
                style={{
                  marginBottom: "10px",
                }}
                responsive={true}
              >
                <tbody>
                  <tr className="tr">
                    <td
                      style={{
                        backgroundColor: "#96D4D4",
                        border: "1px solid white",
                        borderCollapse: "collapse",
                        padding: "7px",
                        width: "100px",
                      }}
                    >
                      {token.id}
                    </td>
                    <td
                      style={{
                        backgroundColor: "#96D4D4",
                        border: "1px solid white",
                        borderCollapse: "collapse",
                        padding: "7px",
                        width: "800px",
                      }}
                    >
                      {(token.requiredAmount)}
                    </td>
                    <td
                      style={{
                        backgroundColor: "#96D4D4",
                        border: "1px solid white",
                        borderCollapse: "collapse",
                        padding: "7px",
                        width: "300px",
                      }}
                    >
                      {token.owner}
                    </td>
                    <td
                      style={{
                        backgroundColor: "#96D4D4",
                        border: "1px solid white",
                        borderCollapse: "collapse",
                        padding: "7px",
                        width: "400px",
                      }}
                    >
                      {token.title}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))
      ) : (
        <div>No data available</div>
      )}   
    
        {/* Card */}

      </CardsWrapper>
    </HomeWrapper>
  )
}



const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`
const CardsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 80%;
  margin-top: 25px;
`
const Card = styled.div`
  width: 30%;
  margin-top: 20px;
  background-color: ${(props) => props.theme.bgDiv};

  &:hover{
    transform: translateY(-10px);
    transition: transform 0.5s;
  }
  
  &:not(:hover){
    transition: transform 0.5s;
  }
`
const CardImg = styled.div`
  position: relative;
  height: 120px;
  width: 100%;
`
const Title = styled.h2`
  font-family: 'Roboto';
  font-size: 18px;
  margin: 2px 0px;
  background-color: ${(props) => props.theme.bgSubDiv};
  padding: 5px;
  cursor: pointer;
  font-weight: normal;
`
const CardData = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2px 0px;
  background-color: ${(props) => props.theme.bgSubDiv};
  padding: 5px;
  cursor: pointer;
  `
const Text = styled.p`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  font-family: 'Roboto';
  font-size: 18px;
  font-weight: bold;
`
const Button = styled.button`
  padding: 8px;
  text-align: center;
  width: 100%;
  background-color:#00b712 ;
  background-image:
      linear-gradient(180deg, #00b712 0%, #5aff15 80%); 
  border: none;
  cursor: pointer;
  font-family: 'Roboto';
  text-transform: uppercase;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
`