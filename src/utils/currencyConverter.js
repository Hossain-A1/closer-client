export const currencyCvt = (amount)=>{
  return amount?.toLocaleString('en-US',{
    style:"currency",
    currency:"USD"
  })
}