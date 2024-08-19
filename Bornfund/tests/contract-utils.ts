import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Donation,
  campaignCreated,
  donated
} from "../generated/Contract/Contract"

export function createDonationEvent(
  from: Address,
  name: string,
  message: string,
  timestamp: BigInt,
  amount: BigInt
): Donation {
  let donationEvent = changetype<Donation>(newMockEvent())

  donationEvent.parameters = new Array()

  donationEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  donationEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  donationEvent.parameters.push(
    new ethereum.EventParam("message", ethereum.Value.fromString(message))
  )
  donationEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )
  donationEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return donationEvent
}

export function createcampaignCreatedEvent(
  title: string,
  requiredAmount: BigInt,
  owner: Address,
  campaignAddress: Address,
  imgURI: string,
  timestamp: BigInt,
  category: string
): campaignCreated {
  let campaignCreatedEvent = changetype<campaignCreated>(newMockEvent())

  campaignCreatedEvent.parameters = new Array()

  campaignCreatedEvent.parameters.push(
    new ethereum.EventParam("title", ethereum.Value.fromString(title))
  )
  campaignCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "requiredAmount",
      ethereum.Value.fromUnsignedBigInt(requiredAmount)
    )
  )
  campaignCreatedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  campaignCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "campaignAddress",
      ethereum.Value.fromAddress(campaignAddress)
    )
  )
  campaignCreatedEvent.parameters.push(
    new ethereum.EventParam("imgURI", ethereum.Value.fromString(imgURI))
  )
  campaignCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )
  campaignCreatedEvent.parameters.push(
    new ethereum.EventParam("category", ethereum.Value.fromString(category))
  )

  return campaignCreatedEvent
}

export function createdonatedEvent(
  donar: Address,
  amount: BigInt,
  timestamp: BigInt
): donated {
  let donatedEvent = changetype<donated>(newMockEvent())

  donatedEvent.parameters = new Array()

  donatedEvent.parameters.push(
    new ethereum.EventParam("donar", ethereum.Value.fromAddress(donar))
  )
  donatedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  donatedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return donatedEvent
}
