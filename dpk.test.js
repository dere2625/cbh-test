const { refactoredDeterministicPartitionKey, deterministicPartitionKey } = require("./dpk")
const crypto = require("crypto")

describe("refactoredDeterministicPartitionKey", ()=> {

  it("should return the trivial partition key if no event is provided"
  ,()=> {
    expect(refactoredDeterministicPartitionKey()).toBe("0")
  })

  it("should return the provided partition key if it exists", 
  ()=>{
    const event = {partitionKeyCandidate : "test1"}
    expect(refactoredDeterministicPartitionKey(event)).toBe("test1")
  })

  it("should hash the partition key if it is too long",
  ()=> {
    const largeKey = "a".repeat(256)
    const event = {partitionKeyCandidate : largeKey}
    expect(refactoredDeterministicPartitionKey(event)).toMatch(/^[0-9a-f]{128}$/)
  })
})


