import React,{useState} from 'react'
import { AmountToWords, CountryCodes } from 'amount-in-words';
import {Form,Label,Input,Row,Col,FormGroup,Button, Container} from 'reactstrap'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function ReceiptForm() {
    const [rno, setRno] = useState(1)
    const [name, setName] = useState("")
    const [date, setDate] = useState("")
    const [email, setEmail] = useState("")
    const [type, setType] = useState("")
    const [paid, setPaid] = useState("")
    const [amt, setAmt] = useState("")
    const [aiw, setAiw] = useState("")

    const URL = process.env.React_App_BASE_URL

    const atw = new AmountToWords();

    const aiwHandler = (e) => {
        setAiw(atw.toWords(amt, CountryCodes.IND))
    }


    const submitHandler = async (e) => {
        e.preventDefault();
        const data = {
            rno: rno,
            name: name,
            date: date,
            email: email,
            type: type,
            paid: paid,
            amt: amt,
            aiw: aiw
        }
        
        // eslint-disable-next-line
        const response = await fetch(URL,{
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({data}),
        })
            .then((res) => res.json())
            .then(async(res) => {
                const resData = await res;
                if(resData.status === "success"){

                    toast.success(type + " Receipt sent to "+ name,{
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: true,
                    })
                }else if(resData.status === "fail"){
                    toast.error("Something went wrong. Failed to sent Receipt to "+ name,{
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: true,
                    })
                }
            })
            .then(()=>{
                setRno((c)=> c+1)
                setName("")
                setDate("")
                setEmail("")
                setType("")
                setPaid("")
                setAmt("")
                setAiw("")
            })

    }



  return (
<Container fluid>
    <h1 className='centerform'>Receipt Form</h1>
    <ToastContainer/>
    <Form onSubmit={submitHandler}>
        <Row className='centerform'>
            <Col md={3}>
                <FormGroup>
                    <Label for='RecepitNo'>Receipt No.</Label>
                    <Input onChange={(e) => setRno(e.target.value)} id='RecepitNo' name='rno' type='text' value={rno}/>
                </FormGroup>
            </Col>
            <Col md={3}>
                <FormGroup>
                    <Label for='PersonName'>Name</Label>
                    <Input onChange={(e) => setName(e.target.value)} id='PersonName' name='name' type='text' value={name}/>
                </FormGroup>
            </Col>
        </Row>
        <Row className='centerform'>
            <Col md={3}>
                <FormGroup>
                    <Label for='Date'>Date</Label>
                    <Input onChange={(e) => setDate(e.target.value)} id='Date' name='date' type='date' value={date}/>
                </FormGroup>
            </Col>
            <Col md={3}>
                <FormGroup>
                    <Label for='Email'>Email</Label>
                    <Input onChange={(e) => setEmail(e.target.value)} id='Email' name='email' type='email' value={email}/>
                </FormGroup>
            </Col>
        </Row>
        <Row className='centerform'>
            <Col md={3}>
                <FormGroup>
                    <Label for='Type'>Type</Label>
                    {/* <Input onChange={(e) => setType(e.target.value)} id='Type' name='type' type='text' value={type}/> */}
                    <Input onChange={(e) => setType(e.target.value)} id='Type' name='type' type='select' value={type}>
                        <option  value='None'>None</option>
                        <option value='Tithe'>Tithe</option>
                        <option value='Malayalam Offering'>Malayalam Offering</option>
                        <option value='English Offering'>English Offering</option>
                        <option value='Kannada Ofering'>Kannada Ofering</option>
                        <option value='Donations/Miscellaneous'>Donations/Miscellaneous</option>
                    </Input>
                </FormGroup>
            </Col>
            <Col md={3}>
                <FormGroup>
                    <Label for='Paid'>Paid By</Label>
                    {/* <Input onChange={(e) => setPaid(e.target.value)} id='Paid' name='paid' type='text' value={paid}/> */}
                    <Input onChange={(e) => setPaid(e.target.value)} id='Paid' name='paid' type='select' value={paid}>
                        <option  value='None'>None</option>
                        <option  value='Cash'>Cash</option>
                        <option  value='Bank'>Bank</option>
                    </Input>

                </FormGroup>
            </Col>
        </Row>
        <Row className='centerform'>
            <Col md={3}>
                <FormGroup>
                    <Label for='Amount'>Amount</Label>
                    <Input onChange={(e)=> setAmt(e.target.value)} id='Amount' name='amt' type='text' value={amt}/>
                </FormGroup>
            </Col>
            <Col md={3}>
                <FormGroup>
                    <Label for='InWords'>In Words</Label>
                    <Input onChange={(e)=>setAiw(e.target.value)} onFocus={aiwHandler} id='InWords' name='aiw' type='text' value={aiw}/>
                </FormGroup>
            </Col>
        </Row>
        <Row className='centerform'>
            <Col md={1}>
                <FormGroup>
                    <Button color='primary' outline>Submit</Button>
                </FormGroup>
            </Col>
        </Row>
    </Form>
</Container>
  )
}

export default ReceiptForm