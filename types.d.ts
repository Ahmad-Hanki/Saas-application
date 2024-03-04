type UserInfo = {
    email:string,
    id: string,
    firstname: string | null | undefined,
    lastname: string | null | undefined,
    profileImage: string | null | undefined,
}

type StripeType = {
    priceId: string,
    domainUrl:string ,
    customerId:string
}