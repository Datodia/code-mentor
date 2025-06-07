import React from 'react'
import { Card, CardContent } from './card'

type PropType = {
    total: number,
    captured: number,
    blocked: number
}

export default function PaymentGrid({ blocked = 0, captured = 0, total = 0}: Partial<PropType>) {
    return (
        <div className="grid grid-cols-3 gap-4">
            <Card>
                <CardContent>
                    <p className="text-sm text-muted-foreground">Total income</p>
                    <p className="text-xl font-bold">GEL {total.toFixed(2)}</p>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <p className="text-sm text-muted-foreground">Captured</p>
                    <p className="text-xl font-bold">{captured}</p>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <p className="text-sm text-muted-foreground">Blocked</p>
                    <p className="text-xl font-bold">{blocked}</p>
                </CardContent>
            </Card>
        </div>
    )
}
