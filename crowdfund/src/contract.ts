import {
  Donation as DonationEvent,
  campaignCreated as campaignCreatedEvent,
  donated as donatedEvent
} from "../generated/Contract/Contract"
import { Donation, campaignCreated, donated } from "../generated/schema"

export function handleDonation(event: DonationEvent): void {
  let entity = new Donation(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.name = event.params.name
  entity.message = event.params.message
  entity.timestamp = event.params.timestamp
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlecampaignCreated(event: campaignCreatedEvent): void {
  let entity = new campaignCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.title = event.params.title
  entity.requiredAmount = event.params.requiredAmount
  entity.owner = event.params.owner
  entity.campaignAddress = event.params.campaignAddress
  entity.imgURI = event.params.imgURI
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handledonated(event: donatedEvent): void {
  let entity = new donated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.donar = event.params.donar
  entity.amount = event.params.amount
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
