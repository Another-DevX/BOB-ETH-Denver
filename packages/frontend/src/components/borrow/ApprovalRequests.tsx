import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

function ApprovalRequests() {
  return (
    <Card className='approvals'>
      <CardHeader>
        <CardTitle>Your Approval Requests</CardTitle>
      </CardHeader>
      <CardContent>
        <p>You have no pending approval requests.</p>
      </CardContent>
    </Card>
  );
}

export { ApprovalRequests };
