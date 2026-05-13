import express from "express";
import cors from "cors";
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

const port = 4000;

app.use(express.json());
app.use(cors());

app.get('/get-countries', async (req, res) => {
    const status = req.query.status;

    const countries = await prisma.country.findMany({
        where: status ? { status: status.toUpperCase() } : {}
    });

    res.send(countries);
})

app.get('/get-country/:countryId', async (req, res) => {
    const countryId = parseInt(req.params.countryId);

    const country = await prisma.country.findUnique({
        where: { id: countryId }
    });

    res.send(country);
})

app.post('/add-country', async (req, res) => {

    const countryData = req.body;

    if (!countryData.name || !countryData.description || !countryData.imgUrl) {
        res.send({ error: "You've left empty fields." });
        return;
    }

    const country = await prisma.country.create({
        data: {
            name: countryData.name,
            description: countryData.description,
            imgUrl: countryData.imgUrl,
            status: countryData.status ? countryData.status.toUpperCase() : undefined,
        }
    });

    res.send({ success: "Added " + country.name + " successfully!" }); setTimeout(() => { 2000 })
;
});

app.patch('/update-country/:countryId', async (req, res) => {
    const countryId = parseInt(req.params.countryId);
    const countryData = req.body;

    const existingCountry = await prisma.country.findUnique({
        where: { id: countryId }
    });

    const updateData = {
        name: countryData.name || undefined,
        description: countryData.description || undefined,
        imgUrl: countryData.imgUrl || undefined,
        status: countryData.status ? countryData.status.toUpperCase() : undefined,
    };

    const updatedCountry = await prisma.country.update({
        where: { id: countryId },
        data: updateData
    });

    const statusChangedToVisited = existingCountry?.status !== 'VISITED'
        && countryData.status?.toUpperCase() === 'VISITED';

    let message;

    if (statusChangedToVisited) {
        message = "Marked " + updatedCountry.name + " as visited."; 
    } else { message = ""}

    res.send({ success: "Updated " + updatedCountry.name + " successfully! " + message });

});

app.patch('/countries/:countryId/visit', async (req, res) => {
    const countryId = parseInt(req.params.countryId);

    const country = await prisma.country.findUnique({
        where: { id: countryId }
    });

    if (!country) {
        return res.status(404).send({ error: "Country not found." });
    }

    const updatedCountry = await prisma.country.update({
        where: { id: countryId },
        data: { status: 'VISITED' }
    });

    res.send({ success: "Marked " + updatedCountry.name + " as visited." });
});

app.delete('/delete-country/:countryId', async (req, res) => {
    const countryId = parseInt(req.params.countryId);

    const deletedCountry = await prisma.country.delete({
        where: { id: countryId }
    })

    res.send({ success: "Deleted " + deletedCountry.name + " from countries list." })
})

app.listen(port, () => {
    console.log("Server running on port ", port)
})

