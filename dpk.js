const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  if (event) {
    if (event.partitionKey) {
      candidate = event.partitionKey;
    } else {
      const data = JSON.stringify(event);
      candidate = crypto.createHash("sha3-512").update(data).digest("hex");
    }
  }

  if (candidate) {
    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }
  } else {
    candidate = TRIVIAL_PARTITION_KEY;
  }
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }
  return candidate;
};


//refactored dpk.js
//returns a deterministic partition key for the given event
exports.refactoredDeterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0"
  const MAX_PARTITION_KEY_LENGTH = 256

  //Use the provided partition key if it exists, otherwise has the event data

  let partitionKeyCandidate
  if(event){
    if(event.partitionKey){
      partitionKeyCandidate = event.partitionKey
    }
    else{
      const data = JSON.stringify(event);
      partitionKeyCandidate = crypto.createHash("sha3-512").update(data).digest("hex")
    }
  }

  //If no partition key was provided or derived, use the trivial partition key

  if(partitionKeyCandidate){
    if(typeof partitionKeyCandidate !== "string"){
      partitionKeyCandidate = JSON.stringify(partitionKeyCandidate)
    }
  }else{
    partitionKeyCandidate = TRIVIAL_PARTITION_KEY
  }

  //If the partition key is too long, has it to ensure it fits within the maximum length

  if(partitionKeyCandidate.length > MAX_PARTITION_KEY_LENGTH){
    partitionKeyCandidate = crypto.createHash("sha3-512").update(partitionKeyCandidate).digest("hex")
  }

  return partitionKeyCandidate
}