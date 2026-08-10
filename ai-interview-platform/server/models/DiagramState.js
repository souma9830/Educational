import mongoose from 'mongoose';

const diagramNodeSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: {
    type: String,
    enum: ['API Gateway', 'Load Balancer', 'Redis Cache', 'PostgreSQL DB', 'Kafka Queue', 'Microservice', 'CDN'],
    required: true
  },
  label: { type: String, required: true },
  x: { type: Number, required: true, default: 100 },
  y: { type: Number, required: true, default: 100 },
  width: { type: Number, default: 140 },
  height: { type: Number, default: 60 }
});

const diagramConnectorSchema = new mongoose.Schema({
  id: { type: String, required: true },
  fromNodeId: { type: String, required: true },
  toNodeId: { type: String, required: true },
  label: { type: String },
  lineStyle: { type: String, enum: ['solid', 'dashed', 'dotted'], default: 'solid' }
});

const diagramStateSchema = new mongoose.Schema({
  interviewId: {
    type: String,
    required: true,
    index: true
  },
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  interviewerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  nodes: [diagramNodeSchema],
  connectors: [diagramConnectorSchema],
  version: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const DiagramState = mongoose.model('DiagramState', diagramStateSchema);
export default DiagramState;
