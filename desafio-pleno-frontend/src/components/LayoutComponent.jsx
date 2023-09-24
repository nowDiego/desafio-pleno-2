import Header from './Header'

export default function LayoutComponent({children}){

    return(
        <>
        <Header/>
        {children}
        </>
    )


}