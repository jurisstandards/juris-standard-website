import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { ProfileData, Track } from '@/lib/submissionStore';

// Register a premium serif font for the PDF if possible, falling back to Times-Roman
// Font.register({ family: 'Times', src: '...' });

const styles = StyleSheet.create({
  page: {
    padding: 50,
    backgroundColor: '#0a0a0a',
    color: '#ffffff',
    fontFamily: 'Times-Roman',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    borderBottom: '1px solid #D4AF37',
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#D4AF37',
    marginBottom: 5,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 12,
    color: '#ffffff',
    letterSpacing: 3,
    textTransform: 'uppercase',
    opacity: 0.8,
  },
  referenceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
    fontSize: 10,
    color: '#aaaaaa',
  },
  greeting: {
    fontSize: 12,
    marginBottom: 15,
  },
  paragraph: {
    fontSize: 11,
    lineHeight: 1.6,
    marginBottom: 30,
    color: '#cccccc',
  },
  table: {
    width: '100%',
    marginBottom: 40,
    borderTop: '0.5px solid rgba(212, 175, 55, 0.3)',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '0.5px solid rgba(212, 175, 55, 0.3)',
    paddingVertical: 12,
  },
  tableLabel: {
    width: '40%',
    fontSize: 10,
    color: '#aaaaaa',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  tableValue: {
    width: '60%',
    fontSize: 11,
    color: '#ffffff',
  },
  noticeBox: {
    border: '1px solid #D4AF37',
    padding: 15,
    marginBottom: 30,
    backgroundColor: 'rgba(212, 175, 55, 0.05)',
  },
  noticeTitle: {
    fontSize: 10,
    color: '#D4AF37',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  noticeText: {
    fontSize: 9,
    color: '#aaaaaa',
    lineHeight: 1.5,
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    left: 50,
    right: 50,
    alignItems: 'center',
    borderTop: '1px solid rgba(212, 175, 55, 0.3)',
    paddingTop: 15,
  },
  footerQuote: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#D4AF37',
    marginBottom: 5,
  },
  footerText: {
    fontSize: 8,
    color: '#aaaaaa',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});

interface PdfProps {
  profileData: ProfileData;
  track: Track;
  programme: string | null;
  referenceNumber: string;
}

export const SubmissionPdfDocument = ({ profileData, track, programme, referenceNumber }: PdfProps) => {
  const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  
  const getTrackName = () => {
    switch(track) {
      case 'law_firm_excellence': return "Law Firm Excellence™";
      case 'corporate_elite': return "Corporate Elite™";
      case 'litigation_masters': return "Litigation Masters™";
      case 'women_leaders': return "Women Leaders™";
      case 'future_leaders': return "Future Leaders™";
      case 'legal_innovation': return "Legal Innovation Excellence™";
      default: return "Not Selected";
    }
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Juris Standard</Text>
          <Text style={styles.subtitle}>Editorial Submission Acknowledgement</Text>
        </View>

        <View style={styles.referenceInfo}>
          <Text>Date: {dateStr}</Text>
          <Text>Reference: {referenceNumber}</Text>
        </View>

        <Text style={styles.greeting}>Dear {profileData.identity.fullName || "Applicant"},</Text>
        
        <Text style={styles.paragraph}>
          Thank you for submitting your Editorial Submission to the Juris Standard Index. This document confirms that your submission has been successfully received by the Juris Standard Editorial Office and has entered the editorial review process. The information provided will be considered in accordance with the Juris Standard Methodology and Editorial Principles.
        </Text>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>Applicant Name</Text>
            <Text style={styles.tableValue}>{profileData.identity.fullName}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>Organisation</Text>
            <Text style={styles.tableValue}>{profileData.identity.organization}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>Recognition Track</Text>
            <Text style={styles.tableValue}>{getTrackName()}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>Programme</Text>
            <Text style={styles.tableValue}>{programme ? programme.replace('_', ' ').toUpperCase() : ''}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>Jurisdiction</Text>
            <Text style={styles.tableValue}>{profileData.identity.country}</Text>
          </View>
        </View>

        <View style={styles.noticeBox}>
          <Text style={styles.noticeTitle}>Editorial Notice</Text>
          <Text style={styles.noticeText}>
            Submission to the Juris Standard Index does not guarantee recognition. Recognition is determined solely through independent editorial assessment in accordance with the published methodology. No applicant may influence, purchase or guarantee editorial recognition.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerQuote}>"Recognition founded on merit. Preserved with integrity."</Text>
          <Text style={styles.footerText}>Juris Standard Independent Editorial Institution</Text>
        </View>
      </Page>
    </Document>
  );
};
